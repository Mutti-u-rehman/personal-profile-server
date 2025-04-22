import User from "../models/User.js";


export const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => { 
    try {
        const user = [{
            name: "Mutti u rehman",
            email: "mutti.mughal@gmail.com",
            age: 32
        }];

        res.status(200).json(user);

        // const users = await User.find();
    //     res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}