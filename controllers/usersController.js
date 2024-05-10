const UserModel= require("../models/users");
const bcrypt = require("bcrypt");

exports.getUsers= async(req,res)=>{
    try {
        const users = await UserModel.find()
        res.status(200).send({
            statusCode:200,
            payload :users
        })
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"Internal server error"
        })
    }
};

exports.getPreferWorks = async (req, res) => {
  const { id } = req.params;
  const { page = 1, pageSize = 4 } = req.query;

  try {
    const user = await UserModel.findById(id)
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .sort({pubDate: -1})

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `user with id ${id} not found`,
      });
    }

    const preferWorks = user.preferWorks.slice((page - 1) * pageSize, page * pageSize);

    const totalPreferWorks = user.preferWorks.length;

    const payload = {
      ...user.toObject(),
      preferWorks,
    };

    res.status(200).send({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalPreferWorks / pageSize),
      statusCode: 200,
      message: `user with id ${id} correctly found`,
      payload,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.getSingleUsers = async (req, res) => {
    const { id } = req.params;
    const { page = 1, pageSize = 4 } = req.query;
  
    try {
      const user = await UserModel.findById(id)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort({pubDate: -1})
  
      if (!user) {
        return res.status(404).send({
          statusCode: 404,
          message: `User with id ${id} not found`,
        });
      }
  
      const preferWorks = await UserModel.find({ _id: id }, { preferWorks: { $slice: [(page - 1) * pageSize, pageSize] } });
  
      const totalPreferWorks = user.preferWorks.length;
  
      res.status(200).send({
        currentPage: page,
        pageSize,
        totalPages: Math.ceil(totalPreferWorks / pageSize),
        statusCode: 200,
        message: `User with id ${id} correctly found`,
        payload: preferWorks,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  };
  
exports.addUser=async(req,res)=>{
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(req.body.password,salt)

    const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        preferWorks:req.body.preferWorks
    })
    try {
        await newUser.save()
        res.status(201).send({
            statusCode:201,
            message : "User successfully create"
        })
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"Internal server error"
        })
    }
};

exports.updateUser=async(req,res)=>{
    const {id}= req.params
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).send({
                statusCode: 404,
                message: 'The requested user not exist!'
            })
    }

    try {

        const updatedData = {...req.body.preferWorks,...req.body};
        const options = { new: true };

        const result = await UserModel.findByIdAndUpdate(id, updatedData, options);

        res.status(200).send(result)
    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
};

exports.deleteUser=async(req,res)=>{
    const {id}=req.params
    
    try {
        const user = await UserModel.findByIdAndDelete(id)
        if(!user){
            return res.status(404).send({
                statusCode:404,
                message:`The user with id ${id} not exist`
            })
        }
        res.status(200).send(`User with id ${id} successfully removed`)
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"Internal server error"
        })
    };
};

exports.deleteWorkFromPreferWorks = async (req, res) => {
  const { userId, workId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `user with ID ${userId} not found`,
      });
    }

    const workIndex = user.preferWorks.findIndex(
      (work) => work._id.toString() === workId
    );

    if (workIndex === -1) {
      return res.status(404).send({
        statusCode: 404,
        message: `Work with ID ${workId} not found in preferWorks of user with ID ${userId}`,
      });
    }

    user.preferWorks.splice(workIndex, 1);
    await user.save();

    res.status(200).send({
      statusCode: 200,
      message: `Work with ID ${workId} deleted from preferWorks of user with ID ${userId}`,
    });
  } catch (error) {
    console.error("Error deleting work from preferWorks:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.toggleToPreferWorks = async (req, res) => {
  const { id } = req.params;
  const { author, title, description, img, location } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `User with ID ${id} not found`,
      });
    }

    const existingWork = user.preferWorks.find(
      (work) =>
        work.author === author &&
        work.title === title &&
        work.description === description &&
        work.img === img &&
        work.location === location
    );

    if (existingWork) {
      return res.status(400).send({
        statusCode: 400,
        message: "Work allready saved!",
      });
    }
    user.preferWorks.push({
      author,
      title,
      description,
      img,
      location,
    });

    await user.save();

    const addedWork = user.preferWorks[user.preferWorks.length - 1];

    res.status(200).send({
      statusCode: 200,
      message: `Work added to myWorks of user with ID ${id}`,
      work: addedWork,
    });
  } catch (error) {
    console.error("Error adding professional work to user's preferWorks:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

