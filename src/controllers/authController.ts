import { Request, Response } from 'express';
import { userData, UserInterface } from '../db/userData';

export const loginController = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: UserInterface | undefined = userData.find(user => user.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Incorrect email or password. Please try again !' });
    }
    
    const response = ({
        id: user.userId,
        userName: user.username,
        userEmail: user.email,
        balance: user.balance,
        isAuth: true
    });

    res.status(200).json({ message: 'Login successful', user: response });
};
