import pdf from 'pdf-parse';
import mammoth from 'mammoth';

const calculateAtsScore = (resumeText, jobDescriptionText) => {
  // Placeholder for ATS score calculation logic
  return Math.floor(Math.random() * 51) + 50; // Random score between 50 and 100
};

const getSuggestions = (resumeText, jobDescriptionText) => {
  // Placeholder for suggestions logic
  return [
    'Add more skills from the job description.',
    'Include a professional summary.',
    'Quantify your achievements with numbers.',
  ];
};

export const scoreResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: 'Resume file is required.' });
    }

    let resumeText = '';
    if (resumeFile.mimetype === 'application/pdf') {
      const data = await pdf(resumeFile.buffer);
      resumeText = data.text;
    } else if (
      resumeFile.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const { value } = await mammoth.extractRawText({
        buffer: resumeFile.buffer,
      });
      resumeText = value;
    } else {
      return res.status(400).json({ message: 'Unsupported file type.' });
    }

    const score = calculateAtsScore(resumeText, jobDescription);
    const suggestions = getSuggestions(resumeText, jobDescription);

    res.status(200).json({ score, suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};