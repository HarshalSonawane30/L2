export const createCourse = (req, res) => {
  res.json({ message: "Create course working" });
};

export const getAllCourses = (req, res) => {
  res.json({ message: "Get all courses working" });
};

export const getCourseById = (req, res) => {
  res.json({ message: `Get course ${req.params.id}` });
};

export const updateCourse = (req, res) => {
  res.json({ message: `Update course ${req.params.id}` });
};

export const deleteCourse = (req, res) => {
  res.json({ message: `Delete course ${req.params.id}` });
};

export const enrollCourse = (req, res) => {
  res.json({ message: `Enroll to course ${req.params.id}` });
};
