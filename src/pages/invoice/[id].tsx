import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CustomerInfo, Section } from "./index";
import convertMarkdownToHTML from "@/utils/convertMarkdownToHTML";

type InvoiceData = {
  customerInfo: CustomerInfo;
  sections: Section[];
  date: string;
};

export default function Page() {
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (invoiceData) {
      const total = invoiceData.sections.reduce(
        (acc, section) =>
          acc + section.items.reduce((acc, item) => acc + item.total, 0),
        0
      );

      setTotal(total);
    }
  }, [invoiceData]);

  useEffect(() => {
    const getInvoice = (id: string) => {
      fetch(`/api/invoice?id=${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((d) => d.json())
        .then((res) => {
          setInvoiceData(res);
        });
    };
    if (typeof router.query.id === "string") {
      getInvoice(router?.query?.id || "");
    }
  }, [router.query.id]);

  return invoiceData ? (
    <div className="invoice-container">
      <style jsx>
        {`
          body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
              "Helvetica Neue", sans-serif;
            line-height: 1.4;
            color: #333;
            background: #f5f5f5;
          }

          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .header {
            border-bottom: 2px solid #ffc527;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }

          .company-name {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 5px;
          }

          .quote-title {
            font-size: 20px;
            color: #666;
          }

          .quote-number {
            float: right;
            text-align: right;
          }

          .quote-number h2 {
            margin: 0;
            color: #333;
            font-size: 24px;
          }

          .quote-number p {
            margin: 5px 0;
            color: #666;
          }

          .address-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }

          .billing-info,
          .service-info {
            flex: 1;
            max-width: 45%;
          }

          .section-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
            font-size: 16px;
          }

          .address-content {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
          }

          .line-items {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }

          .line-items th {
            background: #f5f5f5;
            padding: 12px;
            text-align: left;
            border-bottom: 2px solid #ddd;
          }

          .line-items td {
            padding: 12px;
            border-bottom: 1px solid #eee;
          }

          .line-items .description {
            width: 60%;
          }

          .line-items .quantity,
          .line-items .price,
          .line-items .total {
            width: 13%;
            text-align: right;
            vertical-align: top;
          }

          .totals {
            float: right;
            width: 300px;
          }

          .totals table {
            width: 100%;
          }

          .totals td {
            padding: 5px;
          }

          .totals .label {
            text-align: left;
          }

          .totals .amount {
            text-align: right;
          }

          .grand-total {
            font-weight: bold;
            font-size: 18px;
            border-top: 2px solid #333;
          }

          .payment-info {
            clear: both;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }

          .payment-method {
            margin: 15px 0;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 5px;
          }

          .cc-notice {
            color: #ff4444;
            font-weight: 500;
            margin: 15px 0;
          }

          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
        `}
      </style>
      <div className="header">
        <div className="quote-number">
          <h2>Quote #{router.query.id}</h2>
          <p>Date: {new Date(invoiceData.date).toLocaleDateString()}</p>
        </div>
        <div className="company-name">Felicita Holdings Ltd.</div>
        <div className="quote-title">Quote for Services</div>
      </div>

      <div className="address-section">
        <div className="billing-info">
          <div className="section-title">Billing Information:</div>
          <div className="address-content">
            {invoiceData?.customerInfo.name}
            <br />
            {invoiceData?.customerInfo?.company || "no company"}
            <br />
            {invoiceData?.customerInfo.address}
            <br />
            Phone: {invoiceData?.customerInfo.phone}
            <br />
            Email: {invoiceData?.customerInfo.email}
          </div>
        </div>
        <div className="service-info">
          <div className="section-title">Company Information:</div>
          <div className="address-content">
            Felicita Holdings Ltd.
            <br />
            GST/HST: 751218744RT0001
            <br />
            Worksafe BC: 201008694
            <br />
            Insurance: CT0000332-00
          </div>
        </div>
      </div>

      <table className="line-items">
        <thead>
          <tr>
            <th className="description">Description</th>
            <th className="quantity">Qty</th>
            <th className="price">Unit Price</th>
            <th className="total">Total</th>
          </tr>
        </thead>
        <tbody>
          <Group
            rows={
              invoiceData?.sections.find((s) => s.type === "labor")?.items || []
            }
            title="Labor"
          />
          <Group
            rows={
              invoiceData?.sections.find((s) => s.type === "materials")
                ?.items || []
            }
            title="Materials"
          />
          <Group
            rows={
              invoiceData?.sections.find((s) => s.type === "equipment")
                ?.items || []
            }
            title="Equipment"
          />
        </tbody>
      </table>

      <div className="totals">
        <table>
          <tr>
            <td className="label">Subtotal:</td>
            <td className="amount">{total.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="label">GST (5%):</td>
            <td className="amount">{(total * 0.05).toFixed(2)}</td>
          </tr>
          <tr className="grand-total">
            <td className="label">Total:</td>
            <td className="amount">{(total * 1.05).toFixed(2)}</td>
          </tr>
        </table>
      </div>

      <div className="payment-info">
        <div className="section-title">Payment Methods:</div>

        <div className="payment-method">
          <strong>E-transfer (Preferred)</strong>
          <br />
          Email: info@azhandyman.ca
        </div>

        <div className="payment-method">
          <strong>Direct Deposit</strong>
          <br />
          Transit Number: 96510
          <br />
          Institution Number: 004
          <br />
          Account: 5046731
        </div>

        <div className="payment-method">
          <strong>Cheque</strong>
          <br />
          Make payable to: Felicita Holdings Ltd.
        </div>

        <div className="cc-notice">
          * Please note: A 2.99% fee applies to all credit card payments
        </div>
      </div>

      <div className="footer">
        <p>
          Thank you for your business. Please contact us with any questions
          regarding this quote.
        </p>
        <p>© 2024 Felicita Holdings Ltd. All rights reserved.</p>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

function Group({ rows, title }: { rows: Section["items"]; title: string }) {
  return (
    <>
      <style jsx>
        {`
          tr td {
            padding: 12px;
            border-bottom: 1px solid #eee;
            vertical-align: top;
          }

          tr .description {
            width: 60%;
          }

          .quantity,
          .price,
          .total {
            width: 13%;
            text-align: right;
            vertical-align: top;
          }
        `}
      </style>
      {rows.length ? (
        <tr style={{ backgroundColor: "#fdfdfd" }}>
          <td colSpan={4}>
            <b>{title}</b>
          </td>
        </tr>
      ) : null}
      {rows.map((item, i) => (
        <tr key={i}>
          <td
            className="description"
            dangerouslySetInnerHTML={{
              __html: convertMarkdownToHTML(item.content),
            }}
          />
          <td className="quantity">1</td>
          <td className="price">{item.total}</td>
          <td className="total">{item.total}</td>
        </tr>
      ))}
    </>
  );
}
