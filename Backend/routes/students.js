// import express from "express";
// const router = express.Router();
// import Card from "../models/Student.js";
// import bcrypt from "bcryptjs";
// import upload from "../middleware/upload.js";

// router.get("/api/cards/", async (req,res) => {
//     try {
//         const {limit} = req.query;
//         const hasInvalidQuery = Object.keys(req.query).some(
//             (key) => key !== "limit"
//         );

//         if (hasInvalidQuery) {
//             return res.status(400).json({message: "Invalid query parameter/ give query as limit"})
//         }

//         if(!limit) {
//             const allCards = await Card.find();
//             return res.status(200).json(allCards);
//         }

//         const parsedLimit = Number(limit);
//         if (isNaN(parsedLimit) || parsedLimit <= 0) {
//             return res.status(404).json({
//                 message : "query limit should be a number and it should be more than 0"
//             })        
//         }

//         const totalCards = await Card.countDocuments();

//         if(parsedLimit > totalCards){
//             return res.status(404).json({message : `There are only ${totalCards} cards`});
//         }

//         const limitedCards = await Card.find().limit(parsedLimit);
//         return res.status(200).json(limitedCards);
//     } catch (error){
//         res.status(500).json({message : `Error fetching cards ${error}`})
//     }
// });

// router.get("/api/cards/:id", async (req,res) => {
//     try{
//         const card = await Card.findById(req.params.id);

//         if(card){
//             res.status(200).json(card);
//         }else{
//             res.status(404).json({message: `Card with ID ${req.params.id} not found`})
//         }
//     }catch(error){
//         res.status(500).json({ message: `Error fetching cards, ${error}`})
//     }
// });


// router.post("/api/cards/", upload.single("image"), async (req, res) => {
//     const { username, password, email, gender, age, contact } = req.body;
//     try {
//         const existingUser = await Card.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: "Username already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newCard = new Card({
//             username,
//             password: hashedPassword,
//             email,
//             gender,
//             age: Number(age),
//             contact: Number(contact),
//             image: req.file ? req.file.filename : "",
//         });
// console.log("Received file:", req.file);
// console.log("Received data:", req.body);
//         const savedCard = await newCard.save();
//         res.status(200).json(savedCard);
//     } catch (error) {
//         res.status(500).json({ message: `Error creating new card: ${error}` });
//     }
// });

// router.put("/api/cards/:id", async (req,res)=> {
//     try{
//         const updateData = {...req.body};
//         if(updateData){
//             const salt = await bcrypt.genSalt(10);
//             updateData.password = await bcrypt.hash(updateData.password, salt)
//         }

//         const updatedCard = await Card.findByIdAndUpdate(
//             req.params.id,
//             updateData,
//             {new: true}
//         );

//         if (updatedCard){
//             res.status(200).json(updatedCard)
//         }else{
//             res.status(400).json({message: `Card with ID ${req.params.id} not found`})
//         }
//     }catch(error){
//         res.status(500).json({message: `Error editing cards, ${error}`});
//     }
// });

// router.delete("/api/cards/:id", async (req, res)=> {
//     const deletedCard = await Card.findByIdAndDelete(req.params.id);

//     if(deletedCard){
//         res.status(200).json({message: `Card with id ${req.params.id} deleted`})
//     }else{
//         res.status(404).json({message: `Card with ID ${req.params.id} not found`})
//     }
// })





// router.post("/api/cards/login/", async (req,res)=> {
//   try{
//     const {username, password} = req.body;
//     const card = await Card.findOne({ username });

//     if(!card) {
//       return res.status(404).json({message: `Card ${username} not found`});
//     }

//     const isMatch = await bcrypt.compare(password, card.password);
//     if(!isMatch){
//       return res.status(404).json({message: "invalid password"});
//     }
//      res.status(200).json({message: `login successfull`, card});
//   }catch (error){
//     res.status(500).json({message: `Login error ${error}`})
//   }
// })

// export default router;



import express from "express";
import bcrypt from "bcryptjs";
import upload from "../middleware/upload.js";
import Student from "../models/Student.js";

const router = express.Router();

// GET all students (optional limit)
router.get("/api/students", async (req, res) => {
  try {
    const { limit } = req.query;
    const queryLimit = limit ? parseInt(limit) : null;

    const students = queryLimit
      ? await Student.find().limit(queryLimit)
      : await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students: " + error });
  }
});

// GET student by ID
router.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// REGISTER student
router.post("/api/students", upload.single("image"), async (req, res) => {
  try {
    const { studentName, password, age, gender, rollNo } = req.body;

    // Validate required fields
    if (!studentName || !password || !age || !gender || !rollNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicates by rollNo or studentName
    const existing = await Student.findOne({
      $or: [{ rollNo }, { studentName }],
    });
    if (existing) {
      return res.status(400).json({
        message: "Student with this roll number or name already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const newStudent = new Student({
      studentName,
      password: hashedPassword,
      age: Number(age),
      gender,
      rollNo,
      image: req.file ? req.file.filename : "",
    });

    const saved = await newStudent.save();
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate entry (roll number or name)" });
    }
    res.status(500).json({ message: "Error creating student: " + error });
  }
});

// LOGIN student
router.post("/api/students/login", async (req, res) => {
  try {
    const { studentName, password } = req.body;

    const student = await Student.findOne({ studentName });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Login error: " + error });
  }
});

// UPDATE student
router.put("/api/students/:id", async (req, res) => {
  try {
    const update = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Update error: " + error });
  }
});

// DELETE student
router.delete("/api/students/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete error: " + error });
  }
});

export default router;