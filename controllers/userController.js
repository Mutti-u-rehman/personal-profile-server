import User from "../models/User.js";


/**
 * Creates a new user in the database.
 *
 * @async
 * @function createUser
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a 200 response with new user creation, or a 409 in case of duplicate, or a 400 response if an error occurs during the fetch.
 *
 * @example
 * // POST /api/profile/user
 * createUser(req, res);
 */
export const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        
        // Check if the user already exists
        const isUserAlreadyExist = await User.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(409).json({ message: "User already exists" });
        }
        
        const newUser = new User({ name, email, age });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Retrieves all users from the database.
 *
 * @async
 * @function getUsers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a 200 response with a list of users, or a 500 response if an error occurs during the fetch.
 *
 * @example
 * // GET /api/profile/user
 * getUsers(req, res);
 */
export const getUsers = async (req, res) => { 
    try {

        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: error.message });
    }
}

/**
 * Updating a user by ID
 * 
 * @async
 * @function updateUser
 * @param {Object} req - Express request object
 * @param {string} req.params.id - ID of the user to update
 * @param {Object} res - Express response object
 * @param {return} {Promise<void>} - Sends a 200 response with the updated user data, or a 404 if user not found, or a 500 if an error occurs
 * 
 * @example
 * PUT /api/profile/user/1234
 * updateUser(req, res)
 */
export const updateUser = async (req, res) => { 
    try {
        const userId = req.params.id;
        const { name, email, age } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, age },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: error.message });
    }
}

/**
 * Delete a user by ID
 * 
 * @async
 * @function deleteUser
 * @param {Object} req - Express request object 
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - ID of the user to delete
 * @param {Object} res - Express response object
 * @param {function} res.status - Function to set the response status code
 * @return {Promise<void>} - Sends a 200 response on successfull deletiong, or a 404 if user not found, or a 500 if an error occurs
 * 
 * @example
 * DELETE /api/profile/user/1234
 * deleteUser(req, res)
 */

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: error.message });
    }
}