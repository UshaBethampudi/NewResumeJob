import Job from '../models/Job.js';

const seedJobs = async (req, res) => {
  try {
    await Job.deleteMany({});
    const jobs = [
      {
        "jobTitle": "Software Engineer",
        "company": "Infosys",
        "location": "Hyderabad",
        "experience": "2-4 years",
        "salary": "6-10 LPA",
        "jobDescription": "Java, Spring Boot, Microservices, REST APIs, SQL"
      },
      {
        "jobTitle": "UI Developer",
        "company": "Infosys",
        "location": "Bangalore",
        "experience": "1-3 years",
        "salary": "4-7 LPA",
        "jobDescription": "React, JavaScript, HTML, CSS, Tailwind"
      },
      {
        "jobTitle": "Business Analyst",
        "company": "Infosys",
        "location": "Pune",
        "experience": "3-5 years",
        "salary": "7-12 LPA",
        "jobDescription": "Client communication, Requirement analysis, Agile, Documentation"
      },
      {
        "jobTitle": "Data Analyst",
        "company": "Tech Mahindra",
        "location": "Pune",
        "experience": "1-3 years",
        "salary": "5-8 LPA",
        "jobDescription": "Python, Power BI, SQL, Data Visualization, Excel"
      },
      {
        "jobTitle": "Backend Developer",
        "company": "Tech Mahindra",
        "location": "Bangalore",
        "experience": "2-4 years",
        "salary": "6-9 LPA",
        "jobDescription": "Node.js, Express.js, REST APIs, MongoDB"
      },
      {
        "jobTitle": "Cloud Support Engineer",
        "company": "Tech Mahindra",
        "location": "Hyderabad",
        "experience": "1-3 years",
        "salary": "5-8 LPA",
        "jobDescription": "AWS, Networking, Linux, Cloud Troubleshooting"
      },
      {
        "jobTitle": "Cloud DevOps Engineer",
        "company": "Cognizant",
        "location": "Chennai",
        "experience": "2-5 years",
        "salary": "8-12 LPA",
        "jobDescription": "AWS, Docker, Kubernetes, CI/CD, Linux administration"
      },
      {
        "jobTitle": "Full Stack Developer",
        "company": "Cognizant",
        "location": "Mumbai",
        "experience": "1-4 years",
        "salary": "6-10 LPA",
        "jobDescription": "MERN Stack, REST APIs, Git, Deployment"
      },
      {
        "jobTitle": "QA Automation Engineer",
        "company": "Cognizant",
        "location": "Kolkata",
        "experience": "2-4 years",
        "salary": "5-9 LPA",
        "jobDescription": "Selenium, TestNG, API Testing, Java/Python"
      },
      {
        "jobTitle": "Database Administrator",
        "company": "Oracle",
        "location": "Hyderabad",
        "experience": "3-6 years",
        "salary": "10-15 LPA",
        "jobDescription": "Oracle DB, SQL, Performance Tuning, Backup & Recovery"
      },
      {
        "jobTitle": "Java Developer",
        "company": "Oracle",
        "location": "Bangalore",
        "experience": "2-4 years",
        "salary": "8-12 LPA",
        "jobDescription": "Java, Spring Boot, Microservices, REST APIs"
      },
      {
        "jobTitle": "Cloud Architect",
        "company": "Oracle",
        "location": "Pune",
        "experience": "4-7 years",
        "salary": "12-20 LPA",
        "jobDescription": "OCI, Kubernetes, Terraform, DevOps"
      },
      {
        "jobTitle": "Frontend Developer",
        "company": "Capgemini",
        "location": "Mumbai",
        "experience": "1-3 years",
        "salary": "4-7 LPA",
        "jobDescription": "React, JavaScript, HTML, CSS"
      },
      {
        "jobTitle": "Python Developer",
        "company": "Capgemini",
        "location": "Noida",
        "experience": "2-4 years",
        "salary": "6-10 LPA",
        "jobDescription": "Python, Django, REST APIs, SQL"
      },
      {
        "jobTitle": "Data Engineer",
        "company": "Capgemini",
        "location": "Hyderabad",
        "experience": "3-5 years",
        "salary": "8-13 LPA",
        "jobDescription": "Big Data, ETL, AWS, Spark, SQL"
      },
      {
        "jobTitle": "Software Developer",
        "company": "FactSet",
        "location": "Hyderabad",
        "experience": "1-3 years",
        "salary": "6-9 LPA",
        "jobDescription": "JavaScript, React, APIs, Agile"
      },
      {
        "jobTitle": "Data Research Analyst",
        "company": "FactSet",
        "location": "Chennai",
        "experience": "0-2 years",
        "salary": "4-6 LPA",
        "jobDescription": "Data Analysis, Excel, SQL, Financial Research"
      },
      {
        "jobTitle": "DevOps Engineer",
        "company": "FactSet",
        "location": "Bangalore",
        "experience": "2-5 years",
        "salary": "8-12 LPA",
        "jobDescription": "CI/CD, AWS, Docker, Jenkins, Linux"
      }
    ];
    await Job.insertMany(jobs);
    res.status(201).json({ message: 'Job seeding successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding jobs', error });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

export { seedJobs, getAllJobs };