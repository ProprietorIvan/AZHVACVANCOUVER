import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { from } = req.query;

    // Check if user has already been redirected today
    const redirectCookie = req.cookies.domain_redirect_today;

    if (redirectCookie) {
        return res.status(200).json({
            redirect: false,
            message: 'Already redirected today',
            redirectedTo: redirectCookie
        });
    }

    let redirectPath = '';

    switch (from) {
        case 'vancouver-demolition':
            redirectPath = '/demolition';
            break;
        case 'burnabydrywall':
            redirectPath = '/burnaby-drywall';
            break;
        default:
            return res.status(400).json({ message: 'Invalid redirect source' });
    }

    // Set cookie to prevent multiple redirects today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    res.setHeader('Set-Cookie', [
        `domain_redirect_today=${from}; expires=${tomorrow.toUTCString()}; path=/; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''
        }`
    ]);

    return res.status(200).json({
        redirect: true,
        redirectPath,
        message: `Redirecting to ${redirectPath}`
    });
}


