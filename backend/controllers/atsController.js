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

const enhanceResume = (resumeText, suggestions) => {
  // Placeholder for resume enhancement logic.
  // In a real application, you would parse the resume sections
  // and intelligently insert the suggestions.
  let enhancedResume = resumeText;

  if (suggestions.includes('Add more skills from the job description.')) {
    enhancedResume += '\n\n**Skills Section Enhanced**\n- Added Skill A, Skill B, Skill C';
  }
  if (suggestions.includes('Include a professional summary.')) {
    enhancedResume = '**Professional Summary**\n[Your compelling professional summary goes here, highlighting your key qualifications and career goals.]\n\n' + enhancedResume;
  }
  if (suggestions.includes('Quantify your achievements with numbers.')) {
    // This is harder to automate, we'll just add a note.
    enhancedResume += '\n\n**Note on Achievements**\n- Remember to quantify achievements in your experience section (e.g., "Increased sales by 20%").';
  }

  return enhancedResume;
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
    const enhancedResume = enhanceResume(resumeText, suggestions);

    // Ensure this line is exactly as follows
    res.status(200).json({ score, suggestions, originalResume: resumeText, enhancedResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};