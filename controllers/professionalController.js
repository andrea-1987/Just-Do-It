const ProfessionalModel = require("../models/professionals");
const bcrypt = require("bcrypt");

exports.getProfessional = async (req, res) => {
  try {
    const professionals = await ProfessionalModel.find();
    res.status(200).send({
      statusCode: 200,
      payload: professionals,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.getAllProfessionalMyWorks = async (req, res) => {
  const { page = 1, pageSize = 4 } = req.query;

  try {
    const allProfessionals = await ProfessionalModel.find({}, "myWorks");
    let totalWorkCount = 0;

    allProfessionals.forEach((professional) => {
      if (professional.myWorks && Array.isArray(professional.myWorks)) {
        totalWorkCount += professional.myWorks.length;
      }
    });

    const totalPages = Math.ceil(totalWorkCount / pageSize);

    if (page > totalPages || page <= 0) {
      return res.status(404).send({
        statusCode: 404,
        message: `Page ${page} does not exist`,
      });
    }

    let myWorks = [];
    let accumulatedWorks = 0;

    for (let i = 0; i < allProfessionals.length; i++) {
      const professional = allProfessionals[i];
      if (professional.myWorks && Array.isArray(professional.myWorks)) {
        for (let j = 0; j < professional.myWorks.length; j++) {
          const work = professional.myWorks[j];
          if (
            accumulatedWorks >= (page - 1) * pageSize &&
            myWorks.length < pageSize
          ) {
            myWorks.push(work);
          }
          accumulatedWorks++;
          if (myWorks.length >= pageSize) break;
        }
      }
      if (myWorks.length >= pageSize) break;
    }

    res.status(200).send({
      currentPage: page,
      pageSize: pageSize,
      totalPages: totalPages,
      statusCode: 200,
      payload: myWorks,
    });
  } catch (error) {
    console.error("Error fetching professional my works:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.getSingleWork = async (req, res) => {
  const { workId } = req.params;
  try {
    const professionals = await ProfessionalModel.find({}, "myWorks");
    let foundWork = null;
    professionals.forEach((professional) => {
      const work = professional.myWorks.find(
        (work) => work._id.toString() === workId
      );
      if (work) {
        foundWork = work;
        return;
      }
    });

    if (!foundWork) {
      return res.status(404).send({
        statusCode: 404,
        message: `Work with id ${workId} not found`,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: `Work with id ${workId} correctly found`,
      payload: foundWork,
    });
  } catch (error) {
    console.error("Error fetching work:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.getMyWorks = async (req, res) => {
  const { id } = req.params;
  const { page = 1, pageSize = 4 } = req.query;

  try {
    const professional = await ProfessionalModel.findById(id);
    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with id ${id} not found`,
      });
    }

    let myWorks = professional.myWorks;
    let totalMyWorks = myWorks.length;

    if (page && pageSize) {
      myWorks = myWorks.slice((page - 1) * pageSize, page * pageSize);
    }

    const payload = {
      ...professional.toObject(),
      myWorks,
    };

    res.status(200).send({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalMyWorks / pageSize),
      statusCode: 200,
      message: `My works with id ${id} correctly found`,
      payload,
    });
  } catch (error) {
    console.error("Error fetching professional:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};


exports.getPreferWorks = async (req, res) => {
  const { id } = req.params;
  const { page = 1, pageSize = 4 } = req.query;

  try {
    const professional = await ProfessionalModel.findById(id);

    if (!professional) {
      return res.status(404).json({
        statusCode: 404,
        message: `Professional with id ${id} not found`,
      });
    }
    const preferWorks = professional.preferWorks.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    const totalPreferWorks = professional.preferWorks.length;

    const payload = {
      ...professional.toObject(),
      preferWorks,
    };

    res.status(200).json({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalPreferWorks / pageSize),
      statusCode: 200,
      message: `PreferWorks for professional with id ${id} fetched successfully`,
      payload,
    });
  } catch (error) {
    console.error("Error fetching professional preferWorks:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.getSingleProfessional = async (req, res) => {
  const { id } = req.params;
  const { page = 1, pageSize = 4 } = req.query;

  try {
    const professional = await ProfessionalModel.findById(id)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort({ pubDate: -1 });

    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with id ${id} not found`,
      });
    }

    const myWorks = await ProfessionalModel.find(
      { _id: id },
      { myWorks: { $slice: [(page - 1) * pageSize, pageSize] } }
    );

    const totalMyWorks = professional.myWorks.length;

    res.status(200).send({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalMyWorks / pageSize),
      statusCode: 200,
      message: `professional with id ${id} correctly found`,
      payload: professional,
      myWorks,
    });
  } catch (error) {
    console.error("Error fetching professional:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.addProfessional = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newProfessional = new ProfessionalModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    job: req.body.job,
    preferWorks: req.body.preferWorks,
    myWorks: req.body.myWorks,
  });
  try {
    await newProfessional.save();
    res.status(201).send({
      statusCode: 201,
      message: "Professional successfully create",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.addWorkToMyWorks = async (req, res) => {
  const { id } = req.params;
  const { author, title, description, img, location } = req.body;

  if (!author || !title || !description || !img) {
    return res.status(400).send({
      statusCode: 400,
      message: "Missing required fields: author, title, description, img",
    });
  }

  try {
    const professional = await ProfessionalModel.findById(id);
    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with ID ${id} not found`,
      });
    }

    professional.myWorks.push({
      author,
      title,
      description,
      img,
      location,
    });

    await professional.save();

    const addedWork = professional.myWorks[professional.myWorks.length - 1];

    res.status(200).send({
      statusCode: 200,
      message: `Work added to myWorks of professional with ID ${id}`,
      work: addedWork,
    });
  } catch (error) {
    console.error("Error adding work to myWorks:", error);
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
    const professional = await ProfessionalModel.findById(id);
    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with ID ${id} not found`,
      });
    }

    const existingWork = professional.preferWorks.find(
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
    professional.preferWorks.push({
      author,
      title,
      description,
      img,
      location,
    });

    await professional.save();

    const addedWork = professional.preferWorks[professional.preferWorks.length - 1];

    res.status(200).send({
      statusCode: 200,
      message: `Work added to my saved of professional with ID ${id}`,
      work: addedWork,
    });
  } catch (error) {
    console.error("Error adding professional work to professional's preferWorks:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.updateProfessional = async (req, res) => {
  const { id } = req.params;
  const professional = await ProfessionalModel.findById(id);

  if (!professional) {
    return res.status(404).send({
      statusCode: 404,
      message: "professional not found",
    });
  }

  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    const updatedprofessional = await ProfessionalModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).send({
      statusCode: 200,
      message: "professional updated successfully",
      updatedprofessional,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.deleteProfessional = async (req, res) => {
  const { id } = req.params;

  try {
    const professional = await ProfessionalModel.findByIdAndDelete(id);
    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `The professional with id ${id} not exist`,
      });
    }
    res.status(200).send(`Professional with id ${id} successfully removed`);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.deleteWorkFromPreferWorks = async (req, res) => {
  const { professionalId, workId } = req.params;

  try {
    const professional = await ProfessionalModel.findById(professionalId);
    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with ID ${professionalId} not found`,
      });
    }

    const workIndex = professional.preferWorks.findIndex(
      (work) => work._id.toString() === workId
    );

    if (workIndex === -1) {
      return res.status(404).send({
        statusCode: 404,
        message: `Work with ID ${workId} not found in preferWorks of professional with ID ${professionalId}`,
      });
    }

    professional.preferWorks.splice(workIndex, 1);
    await professional.save();

    res.status(200).send({
      statusCode: 200,
      message: `Work with ID ${workId} deleted from preferWorks of professional with ID ${professionalId}`,
    });
  } catch (error) {
    console.error("Error deleting work from preferWorks:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.deleteWorkFromMyWorks = async (req, res) => {
  const { professionalId, workId } = req.params;

  try {
    const professional = await ProfessionalModel.findById(professionalId);
    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with ID ${professionalId} not found`,
      });
    }

    const workIndex = professional.myWorks.findIndex(
      (work) => work._id.toString() === workId
    );

    if (workIndex === -1) {
      return res.status(404).send({
        statusCode: 404,
        message: `Work with ID ${workId} not found in preferWorks of professional with ID ${professionalId}`,
      });
    }

    professional.myWorks.splice(workIndex, 1);
    await professional.save();

    res.status(200).send({
      statusCode: 200,
      message: `Work with ID ${workId} deleted from preferWorks of professional with ID ${professionalId}`,
    });
  } catch (error) {
    console.error("Error deleting work from preferWorks:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
