const Tutorial = require("../Models/tutorialModels");


exports.createTutorial = async (req, res) => {
    try {
      const { tutorialData } = req.body;
  
      // Check for required fields
      if (
        !tutorialData.title ||
        !tutorialData.body ||
        !tutorialData.Link
      ) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }
      // Create a new Tutorial document
      const newTutorial = await Tutorial.create({
        title: tutorialData.title,
        body: tutorialData.body,
        visibleToRegisteredOnly: tutorialData.visibleToRegisteredOnly || false,
        groupId: tutorialData.groupId || null,
        groupName: tutorialData.groupName || null,
        Link: tutorialData.Link,
      });
  
      // Respond with the created tutorial
      res
        .status(201)
        .json({ message: "Tutorial created successfully", tutorial: newTutorial });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
      console.error({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.TutorialData = async (req, res) => {
    try {
      const TutorialData = await Tutorial.find();
  
      res.status(200).json({ TutorialData });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.TutorialDetails= async (req, res) => {
    try {
      const TutorialDetails = await Tutorial.findById(req.params.id);
  
      res.status(200).json({ TutorialDetails });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.updateTutorial = async (req, res) => {
    const { tutorialData } = req.body;
  
    try {
      // البحث عن الـ Tutorial بواسطة ID
      const tutorial = await Tutorial.findById(req.params.id);
  
      if (!tutorial) {
        return res.status(404).json({ message: "Tutorial not found" });
      }
  
      // تحديث خصائص الـ Tutorial
      tutorial.title = tutorialData.title || tutorial.title;
      tutorial.body = tutorialData.body || tutorial.body;
      tutorial.visibleToRegisteredOnly = 
        tutorialData.visibleToRegisteredOnly !== undefined 
          ? tutorialData.visibleToRegisteredOnly 
          : tutorial.visibleToRegisteredOnly;
      tutorial.groupId = tutorialData.groupId || tutorial.groupId;
      tutorial.groupName = tutorialData.groupName || tutorial.groupName;
      tutorial.Link = tutorialData.Link || tutorial.Link;
  
      // حفظ التغييرات
      await tutorial.save();
  
      res.status(200).json({ message: "Tutorial updated successfully", tutorial });
    } catch (error) {
      res.status(500).json({ message: "Error updating tutorial", error });
    }
  };
  
  exports.HiddenTutorial = async (req, res) => {
    try {    
      const HiddenTutorial = await Tutorial.findById(req.params.id);
      if (!HiddenTutorial) {
        return res.status(404).json({ message: 'VPS Plan not found' });
      }
      HiddenTutorial.isHidden = !HiddenTutorial.isHidden;
      await HiddenTutorial.save();
  
      res.status(200).json({ message: 'Hidden VPS Plan successfully', HiddenTutorial });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };