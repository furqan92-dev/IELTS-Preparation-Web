export const USER_LOGS_TABLE_COLUMNS = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
  },
  {
    title: "Login Time",
    dataIndex: "login",
    key: "login",
    render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
  },
  {
    title: "Logout Time",
    dataIndex: "logout",
    key: "logout",
    render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
  },
];

export const RESOURCES_VIEW_TABLE = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    align: "center",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    align: "center",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "center",
  },
  {
    title: "File",
    dataIndex: "file",
    key: "file",
    align: "center",
  },
];

export const LISTENING_TESTS = [
  {
    id: 1,
    fillInTheBlanks: [
      {
        question:
          "The term ______ is used for human beings' ability to control or manage other individuals or groups.",
        correctAnswers: "Leadership",
      },
      {
        question:
          "______ is the process through which leaders influence people to achieve goals.",
        correctAnswers: "Leadership",
      },
      {
        question:
          "______ leadership involves delegating authority and empowering employees.",
        correctAnswers: "Democratic",
      },
      {
        question:
          "______ power is based on a leader's ability to punish non-compliance.",
        correctAnswers: "Coercive",
      },
      {
        question:
          "Transformational leaders focus on ______ the vision and inspiring followers.",
        correctAnswers: "communicating",
      },
      {
        question:
          "______ leaders tend to clarify expectations and reward performance.",
        correctAnswers: "Transactional",
      },
      {
        question:
          "______ is the ability to influence others because of special knowledge or skill.",
        correctAnswers: "Expert power",
      },
      {
        question:
          "Laissez-faire leadership style is also called ______ leadership.",
        correctAnswers: "hands-off",
      },
      {
        question:
          "One major component of leadership is setting a ______ for the organization.",
        correctAnswers: "vision",
      },
      {
        question:
          "In transactional leadership, the focus is on maintaining the ______.",
        correctAnswers: "status quo",
      },
    ],

    multipleChoice: [
      {
        question: "Which of the following is not a type of power?",
        options: ["A. Coercive", "B. Rational", "C. Reward", "D. Legitimate"],
        correctAnswers: "B",
      },
      {
        question: "Transformational leadership emphasizes:",
        options: [
          "A. Strict rules",
          "B. Vision and inspiration",
          "C. Punishment",
          "D. Avoiding risks",
        ],
        correctAnswers: "B",
      },
      {
        question:
          "The leadership style where the leader avoids making decisions is:",
        options: [
          "A. Autocratic",
          "B. Democratic",
          "C. Laissez-faire",
          "D. Charismatic",
        ],
        correctAnswers: "C",
      },
      {
        question: "Expert power comes from:",
        options: ["A. Position", "B. Rewards", "C. Knowledge", "D. Threats"],
        correctAnswers: "C",
      },
      {
        question: "The ability to influence others due to formal authority is:",
        options: [
          "A. Legitimate power",
          "B. Expert power",
          "C. Coercive power",
          "D. Referent power",
        ],
        correctAnswers: "A",
      },
      {
        question: "Transactional leaders use:",
        options: [
          "A. Vision",
          "B. Rewards and punishments",
          "C. Collaboration",
          "D. Shared leadership",
        ],
        correctAnswers: "B",
      },
      {
        question:
          "Which leadership style promotes team involvement and shared decisions?",
        options: [
          "A. Autocratic",
          "B. Democratic",
          "C. Bureaucratic",
          "D. Laissez-faire",
        ],
        correctAnswers: "B",
      },
      {
        question: "Referent power is based on:",
        options: ["A. Position", "B. Knowledge", "C. Admiration", "D. Fear"],
        correctAnswers: "C",
      },
      {
        question: "Charismatic leaders inspire followers through:",
        options: [
          "A. Strict control",
          "B. Personal charm",
          "C. Technical knowledge",
          "D. Organizational hierarchy",
        ],
        correctAnswers: "B",
      },
      {
        question: "Autocratic leadership involves:",
        options: [
          "A. Group input",
          "B. Freedom in decision-making",
          "C. Centralized control",
          "D. Empowerment",
        ],
        correctAnswers: "C",
      },
      {
        question:
          "Which of the following is true about transformational leaders?",
        options: [
          "A. They rely solely on punishment",
          "B. They inspire and motivate followers",
          "C. They avoid responsibility",
          "D. They work without feedback",
        ],
        correctAnswers: "B",
      },
      {
        question:
          "Which power is related to admiration and respect from others?",
        options: ["A. Coercive", "B. Expert", "C. Referent", "D. Legitimate"],
        correctAnswers: "C",
      },
      {
        question:
          "Which leadership style best fits creative work environments?",
        options: [
          "A. Autocratic",
          "B. Laissez-faire",
          "C. Bureaucratic",
          "D. Transactional",
        ],
        correctAnswers: "B",
      },
      {
        question: "Democratic leaders are known for:",
        options: [
          "A. Making all decisions alone",
          "B. Encouraging team input",
          "C. Punishing mistakes",
          "D. Avoiding leadership responsibility",
        ],
        correctAnswers: "B",
      },
      {
        question:
          "The leadership style with low involvement in team decision-making is:",
        options: [
          "A. Transformational",
          "B. Democratic",
          "C. Autocratic",
          "D. Laissez-faire",
        ],
        correctAnswers: "C",
      },
      {
        question:
          "Which of the following powers is the most sustainable in the long term?",
        options: ["A. Coercive", "B. Reward", "C. Expert", "D. Legitimate"],
        correctAnswers: "C",
      },
      {
        question: "Transactional leadership is primarily focused on:",
        options: [
          "A. Building personal relationships",
          "B. Vision and mission",
          "C. Tasks and rewards",
          "D. Tasks and rewards",
        ],
        correctAnswers: "C",
      },
      {
        question: "The concept of leadership includes all except:",
        options: [
          "A. Influencing people",
          "B. Delegating all work",
          "C. Setting a direction",
          "D. Motivating followers",
        ],
        correctAnswers: "B",
      },
      {
        question: "A leader who acts as a mentor and promotes innovation is a:",
        options: [
          "A. Transactional leader",
          "B. Laissez-faire leader",
          "C. Transformational leader",
          "D. Bureaucratic leader",
        ],
        correctAnswers: "C",
      },
      {
        question: "A power type based on fear or punishment is:",
        options: [
          "A. Reward power",
          "B. Coercive power",
          "C. Referent power",
          "D. Expert power",
        ],
        correctAnswers: "B",
      },
    ],

    trueFalse: [
      {
        question: "Leadership and management are exactly the same.",
        correctAnswers: "False",
      },
      {
        question:
          "Transactional leadership is based on a system of rewards and punishments.",
        correctAnswers: "True",
      },
      {
        question: "Autocratic leaders always encourage team discussions.",
        correctAnswers: "False",
      },
      {
        question: "Referent power is earned through respect and admiration.",
        correctAnswers: "True",
      },
      {
        question:
          "Transformational leaders are more concerned with rules than vision.",
        correctAnswers: "False",
      },
      {
        question: "Expert power can come from both experience and education.",
        correctAnswers: "True",
      },
      {
        question: "Laissez-faire leaders are deeply involved in all decisions.",
        correctAnswers: "False",
      },
      {
        question: "Democratic leadership promotes group participation.",
        correctAnswers: "True",
      },
      {
        question: "Coercive power often leads to resistance in followers.",
        correctAnswers: "True",
      },
      {
        question:
          "Leadership is only needed at the top level of an organization.",
        correctAnswers: "False",
      },
    ],
  },
  {
    id: 2,
    fillInTheBlanks: [
      {
        question: "The speaker wants to know more about __________ classes.",
        correctAnswers: "English",
      },
      {
        question: "The language centre is open from 8:30 am to __________ pm.",
        correctAnswers: "8:00",
      },
      {
        question: "The receptionist's name is __________.",
        correctAnswers: "Amanda",
      },
      {
        question: "The morning sessions begin at __________.",
        correctAnswers: "9:30",
      },
      {
        question: "The student is interested in the __________ course.",
        correctAnswers: "General English",
      },
      {
        question: "Students must pay their fees at the __________ office.",
        correctAnswers: "administration",
      },
      {
        question: "The centre closes at __________ on weekends.",
        correctAnswers: "1:00 pm",
      },
      {
        question: "The student wants to improve her __________ skills.",
        correctAnswers: "pronunciation",
      },
      {
        question: "The __________ room is located on the third floor.",
        correctAnswers: "writing",
      },
      {
        question: "The college is located on __________ Street.",
        correctAnswers: "George",
      },
    ],

    multipleChoice: [
      {
        question: "What kind of course is the student looking for?",
        options: [
          "A. Business English",
          "B. General English",
          "C. English Literature",
          " D. TOEFL Preparation",
        ],
        correctAnswers: "B",
      },
      {
        question: "What time do classes begin in the morning?",
        options: ["A. 9:30", "B. 10:00", "C. 8:30", "D. 8:00"],
        correctAnswers: "A",
      },
      {
        question: "What is the name of the receptionist?",
        options: ["A. Julia", "B. Sarah", "C. Amanda", "D. Linda"],
        correctAnswers: "C",
      },
      {
        question: "How long do the courses last?",
        options: [" A. 6 weeks", "B. 10 weeks", "C. 3 months", "D. 1 month"],
        correctAnswers: "B",
      },
      {
        question: "When is the language centre closed?",
        options: ["A. Friday", "B. Saturday", "C. Sunday", "D. Both B and C"],
        correctAnswers: "D",
      },
      {
        question: "What does the student want to improve?",
        options: ["A. Grammar", "B. Pronunciation", "C. Writing", "D. Reading"],
        correctAnswers: "B",
      },
      {
        question: "Where is the administration office?",
        options: [
          "A. First floor",
          "B. Second floor",
          "C. Ground floor",
          "D. Third floor",
        ],
        correctAnswers: "C",
      },
      {
        question: "What is required to enroll in a class?",
        options: [
          "A. Application form",
          " B. ID only",
          "C. Passport photo",
          "D. Entrance test",
        ],
        correctAnswers: "D",
      },
      {
        question: "What street is the college on?",
        options: [
          " A. King's Road",
          "B. George Street",
          "C. Queen Street",
          "D. Oxford Street",
        ],
        correctAnswers: "B",
      },
      {
        question: "What level is the student?",
        options: [
          "A. Elementary",
          "B. Pre-intermediate",
          "C. Intermediate",
          "D. Advanced",
        ],
        correctAnswers: "C",
      },
      {
        question: "What is the latest time the centre closes on weekdays?",
        options: ["A. 5:00 pm", "B. 6:30 pm", "C. 7:00 pm", "D. 8:00 pm"],
        correctAnswers: "C",
      },
      {
        question: "How many hours per week is the General English course?",
        options: ["A. 10", "B. 15", " C. 20", "D. 25"],
        correctAnswers: "B",
      },
      {
        question: "What is the student required to bring on the first day?",
        options: [
          "A. ID and photos",
          "B. Pen and notebook",
          "C. Uniform",
          "D. Calculator",
        ],
        correctAnswers: "A",
      },
      {
        question: "How can students get help with accommodation?",
        options: [
          "A. Speak to receptionist",
          "B. Visit Room 101",
          "C. Ask at the information desk",
          "D. Send email",
        ],
        correctAnswers: "C",
      },
      {
        question: "When can students register for classes?",
        options: [
          "A. Only Monday",
          "B. Any weekday",
          "C. Weekends only",
          "D. Anytime online",
        ],
        correctAnswers: "B",
      },
      {
        question: "Where is the timetable posted?",
        options: ["A. Coercive", "B. Reward", "C. Expert", "D. Legitimate"],
        correctAnswers: "D",
      },
      {
        question: "What is the first step in enrolling?",
        options: [
          "A. Online",
          "B. Reception",
          "C. Classrooms",
          "D. Noticeboard",
        ],
        correctAnswers: "B",
      },
      {
        question: "What kind of ID is needed to register?",
        options: [
          "A. Pay fees",
          "B. Take placement test",
          "C. Choose course",
          "D. Visit website",
        ],
        correctAnswers: "C",
      },
      {
        question: "What kind of ID is needed to register?",
        options: [
          "A. Passport",
          "B. Student card",
          "C. Any valid ID",
          "D. Driving licence",
        ],
        correctAnswers: "C",
      },
      {
        question: "What is the typical class size?",
        options: ["A. 5-10", "B. 10-15", "C. 15-20", "D. 20-25"],
        correctAnswers: "B",
      },
    ],

    trueFalse: [
      {
        statement: "The student is interested in a Business English course.",
        correctAnswers: "False",
      },
      {
        statement: "The centre opens at 8:00 am.",
        correctAnswers: "False",
      },
      {
        statement: "Amanda is the name of the receptionist.",
        correctAnswers: "True",
      },
      {
        statement: "Classes are not held on Sundays.",
        correctAnswers: "True",
      },
      {
        statement: "The administration office is on the third floor.",
        correctAnswers: "False",
      },
      {
        statement: "Students must bring a passport photo to register.",
        correctAnswers: "True",
      },
      {
        statement: "The student wants to improve pronunciation.",
        correctAnswers: "True",
      },
      {
        statement: "The centre is located on Queen Street.",
        correctAnswers: "False",
      },
      {
        statement: "The General English course is 15 hours per week.",
        correctAnswers: "True",
      },
      {
        statement: "The placement test is taken after choosing the course.",
        correctAnswers: "False",
      },
    ],
  },
  {
    id: 3,
    fillInTheBlanks: [
      {
        question: "Keiko Uchini is a ______ national.",
        correctAnswers: "Japanese",
      },
      {
        question: "The Tower in Bicentennial Park stands ______ metres high.",
        correctAnswers: "12",
      },
      {
        question: "The ______ was discovered in 1908 to enhance flavor.",
        correctAnswers: "track",
      },
      {
        question: "The ______ was discovered in 1908 to enhance flavor.",
        correctAnswers: "glutamate",
      },
      {
        question: "______ is a flavor enhancer commonly used in Asian cuisine.",
        correctAnswers: "MSG",
      },
      {
        question: "The train system is preferred because it is ______.",
        correctAnswers: "faster",
      },
      {
        question: "Keiko plays ______ on weekends with friends.",
        correctAnswers: "tennis",
      },
      {
        question: "The mangroves are accessible via a ______.",
        correctAnswers: "boardwalk",
      },
      {
        question: "The frog pond existed before the ______ was designed.",
        correctAnswers: "",
      },
      {
        question: "The number of presentations per hour is ______.",
        correctAnswers: "three",
      },
    ],

    multipleChoice: [
      {
        question: "What is Keiko's room number?",
        options: ["A. 20B", "B. 21C", "C. 22A", "D. 23D"],
        correctAnswers: "B",
      },
      {
        question: "How long is the Bicentennial Tower?",
        options: [
          "A. 10 meters",
          "B. 12 meters",
          "C. 15 meters",
          "D. 8 meters",
        ],
        correctAnswers: "B",
      },
      {
        question: "Where are rowing boats available?",
        options: [
          "A. Lake",
          "B. Frog Pond",
          "C. Ornamental Pond",
          "D. Rose Garden",
        ],
        correctAnswers: "A",
      },
      {
        question: "Which plant was originally used in Japanese cooking?",
        options: ["A. Seaweed", "B. Spinach", "C. Mint", "D. Basil"],
        correctAnswers: "A",
      },
      {
        question: "MSG contains what percentage of glutamate?",
        options: ["A. 12.2%", "B. 78.2%", "C. 56.5%", "D. 9.6%"],
        correctAnswers: "B",
      },
      {
        question: "What did Dr. White emphasize?",
        options: [
          "A. Long presentation",
          "B. Plenty of visuals",
          "C. Reading aloud",
          "D. No questions",
        ],
        correctAnswers: "B",
      },
      {
        question: "Which sport did Keiko stop playing?",
        options: ["A. Tennis", "B. Handball", "C. Swimming", "D. Cycling"],
        correctAnswers: "B",
      },
      {
        question: "Where is the viewing shelter for bird watchers?",
        options: [
          "A. Tower",
          "B. Frog Pond",
          "C. Estuary",
          "D. Nature Reserve",
        ],
        correctAnswers: "C",
      },
      {
        question: "What is a favorite with biology school parties?",
        options: [
          "A. Outdoor classroom",
          "B. Olympic arena",
          "C. Lake",
          "D. Cafe",
        ],
        correctAnswers: "A",
      },
      {
        question: "Where are the Olympic buildings located from the Tower?",
        options: ["A. East", "B. West", "C. North", "D. South"],
        correctAnswers: "A",
      },
      {
        question: "What nationality is Keiko?",
        options: ["A. Chinese", "B. Japanese", "C. Korean", "D. Vietnamese"],
        correctAnswers: "B",
      },
      {
        question: "What is the purpose of the ornamental pond?",
        options: ["A. Swimming", "B. Rowing", "C. Decoration", "D. Boating"],
        correctAnswers: "C",
      },
      {
        question: "What do school parties often use for learning?",
        options: [
          "A. Cafe",
          "B. Outdoor classroom",
          "C. Viewing tower",
          "D. Car park",
        ],
        correctAnswers: "B",
      },
      {
        question: "What is the benefit of MSG?",
        options: [
          "A. Adds salt",
          "B. Enhances flavor",
          "C. Adds sweetness",
          "D. Removes bitterness",
        ],
        correctAnswers: "B",
      },
      {
        question: "What did Dr. White suggest for presentations?",
        options: [
          "A. Avoid visuals",
          "B. Include plenty of visuals",
          "C. Speak slowly",
          "D. Make it short",
        ],
        correctAnswers: "B",
      },
      {
        question: "What is Keiko's preferred leisure activity?",
        options: ["A. Handball", "B. Tennis", "C. Swimming", "D. Soccer"],
        correctAnswers: "B",
      },
      {
        question: "Where is the frog pond in relation to the boardwalk?",
        options: ["A. Before", "B. Behind", "C. Beyond", "D. Next to"],
        correctAnswers: "A",
      },
      {
        question: "Why do visitors climb the tower?",
        options: [
          "A. To take pictures",
          "B. To see Olympic site",
          "C. To exercise",
          "D. To watch sports",
        ],
        correctAnswers: "B",
      },
      {
        question: "What is recommended for giving presentations?",
        options: [
          "A. Long paragraphs",
          "B. Just reading slides",
          "C. Clear visuals",
          "D. No visuals",
        ],
        correctAnswers: "C",
      },
      {
        question: "Which feature existed before the park's design?",
        options: ["A. Cafe", "B. Frog pond", "C. Tower", "D. Estuary"],
        correctAnswers: "B",
      },
    ],

    trueFalse: [
      {
        question: "Keiko is a vegetarian",
        correctAnswers: "False",
      },
      {
        question: "The rose garden is located in the west of the park.",
        correctAnswers: "True",
      },
      {
        question: "Keiko prefers to live with families with young children.",
        correctAnswers: "False",
      },
      {
        question: "Public transport in the city is always on time.",
        correctAnswers: "False",
      },
      {
        question: "The Olympic site includes a car park.",
        correctAnswers: "True",
      },
      {
        question: "The boat shed is visible from the Tower.",
        correctAnswers: "True",
      },
      {
        question: "Primary schools often use the outdoor classroom.",
        correctAnswers: "True",
      },
      {
        question: "MSG was discovered in 1956.",
        correctAnswers: "False",
      },
      {
        question: "The Tower is the center of the nature reserve.",
        correctAnswers: "False",
      },
      {
        question: "Dr. White said the presentation would be graded.",
        correctAnswers: "False",
      },
    ],
  },
];

export const READING_TEST = [
  {
    id: 1,
    part1: {
      title: "How the mind ages",
      passage: `The way mental function changes is largely determined by three factors-mental lifestyle, the impact of chronic disease and flexibility of the mind.
      Experiments have shown that younger monkeys consistently outperform their older colleagues on memory tests. Formerly, psychologists concluded that memory and other mental functions in humans deteriorate over time because of changes in the brain. Thus mental decline after young adulthood appeared inevitable. The truth, however, is not quite so simple.
      Stanley Rapoport at the National Institute of Health in the United States measured the flow of blood in the brains of old and young people as they completed different tasks. Since blood flow reflects neural activity. Rapoport could compare which networks of neurons were the same, the neural networks they used were significantly different. The older subjects used different internal strategies to accomplish comparable results at the same time,'Rapoport says. At the Georgia Institute of Technology, psychologist Timothy Salthouse compared a group of fast and accurate typists of college age with another group in their 60s. Both groups typed 60 words a minute. The older typists, it turned out, achieved their speed with cunning little strategies that made them more efficient than their younger counterparts. They made fewer finger shifts, gaining a fraction of a second here and there. They also read ahead in the test. The neural networks involved in typing appear to have been reshaped to compensate for losses in motor skills or other age changes.
      In fact, there's evidence that deterioration in mental functions can actually be reversed. Neuropsychologist Marion Diamond at the University of California has shown that mental activity maks neurons sprout new dendrites* which establish connections with other neurons. The dendrites shrink when the mind is idle. For example,'when a rat is kept in isolation, the animal's brain shrinks, but if we put that rat with other rats in a large cage and give them an assortment of toys, we can show, after four days, significant differences in its brain.'says Diamond. After a month in the enriched surroundings, the whole cerebral cortex has expanded, as has its blood supply.'But even in the enriched surroundings, rats get bored unless the toys are varied. Animals are just like we are. They need stimulation,'says Diamond. A busy mental lifestyle keeps the human mind fit, says Warner Schaie of Penn State University. ‘People who regularly participate in challenging tasks retain their intellectual abilities better than mental couch potatoes.'
      In his studies, Schaie detected a decline in mental function among individuals who underwent lengthy stays in hospital for chronic illness. He postulated it might be due to the mental passivity encouraged by hospital routine.One of the most profoundly important mental functions is memory. Memory exists in more than one form, what we call knowledge- facts- is what psychologists such as Harry Bahrick of Ohio Wesleyan University call semantic memory. Events, conversations and occurrences in time and space, on the other hand, make up episodic memory. It's true that episodic memory begins to decline when most people are in their 50s, but it's never perfect at any age.
      Probing the longevity of knowledge, Bahrick tested 1,000 high school graduates to see how well they remembered the school subject algebra. Some had completed the course a month before, other 50 years earlier. Surprisingly, he found that a person's grasp of algebra did not depend on how long ago he'd taken the course. The determining factor was the duration of instruction. Those who had spent only a few months learning algebra forgot most of it within two or three years while others who had been instructed for longer remembered better. According to Bahrick,'the long-term residue of knowledge remains stable over the decades, independent of the age of the person and the memory.'
      Perhaps even more important than the ability to remember is the ability to manage memory- a mental function known as metamemory.'You could say metamemory is a byproduct of going to school,'says psychologist Robert Kail of Purdue University,'The question-and-answer process,especially exam taking, helps children learn and teaches them how their memory functions.This may be one reason why the better educated a person is, the more likely they are to perform well in many aspects of life and in psychological assessments: A group of adult novice chess players were compared with a group of child experts at the game. But when asked to remember the patterns of chess pieces arranged on a board, the children won.' Because they'd played a lot of chess, their knowledge of chess was better organized than that of the adults, and their existing knowledge of chess served as a framework for new memory,'explains Kail. Cognitive style, another factor in maintaining mental function, is what Schaie calls the ability to adapt and roll with life's punches.'He measured mental flexibility with questions and tests requiring people to carry out in an offbeat way an everyday activity they had done millions of times. One example was asking people to copy a paragraph substituting uppercase letters for lowercase ones. These tests seem silly, but flexible-minded people manage to complete them,'says Schaie. The rigid person responds with tension instead and performs poorly. Those who score highly on tests of cognition at an advanced age are those who tested high in mental flexibility at middle age'.
      On a more optimistic note, one mental resource that only improves with time is specialized knowledge. Crystallised intelligence about one's occupation apparently does not decline at all until at least age 75. Vocabulary is another such specialized form of knowledge. Research clearly shows that vocabulary develops with time. Retired teachers and journalists consistently score higher on tests of vocabulary and general information than college students.`,
      multipleChoice: [
        {
          question:
            "What does the writer say about the performance of older typists on the test?",
          options: [
            "They used different motor skills from younger typists.",
            "They had been more efficiently trained than younger typists.",
            "They used more time-saving techniques than younger typists.",
            "They had better concentration skills than younger typists.",
          ],
          correctAnswers: "B",
        },
        {
          question: "The experiment with the rats showed that",
          options: [
            "brain structure only changed when the rats were given a familiar toy ",
            "the rats became anxious after a lengthy period of time alone",
            "the rats lived longer then they were part of a social group",
            "the rats'brains expanded or shrank depending on the level of mental activity",
          ],
          correctAnswers: "B",
        },
        {
          question:
            "A comparison between adults and children who played chess showed that",
          options: [
            "the children were as capable as the adults of remembering a series of numbers",
            "the children had better recall of the layout of pieces",
            "the adults stored memories of chess moves in a more logical manner",
            "the adults had clearer memories of chess games they had played",
          ],
          correctAnswers: "B",
        },
      ],
      summaryCompletion: {
        summary:
          "Psychologists distinguish between two different types of memory: ______ and ______ memory. A study was conducted into people's knowledge of ______ to determine recall ability. This aspect of memory was found to be a function not of age but rather of length of tuition. School also helps with a brain function called ______. This is why a more highly educated person is generally more successful and does better in ______ tests. Some of our mental functions remain unaffected by age or even improve. For example, as we get older, our knowledge of ______ increases.",
        correctAnswers: [
          "semantic",
          "episodic",
          "algebra",
          "metamemory",
          "psychological",
          "vocabulary",
        ],
      },
      sentenceMatching: {
        options: [
          "Stanley Rapoport",
          "Marion Diamond",
          "Warner Schaie",
          "Harry Bahrick",
          "Robert Kail",
        ],
        questions: [
          "The educational system makes students aware of how their memory works.",
          "Although older people may use a different mental approach when completing a task, they can still achieve the same result as younger people.",
          "Being open to new ways of doing things can have a positive impact on your mental condition as we get older.",
          "Both animals and humans need to exist in an environment full of interest.",
        ],
      },
    },
    part2: {
      title: "Ensuring our future food supply",
      passage: `The way mental function changes is largely determined by three factors-mental lifestyle, the impact of chronic disease and flexibility of the mind.
      Experiments have shown that younger monkeys consistently outperform their older colleagues on memory tests. Formerly, psychologists concluded that memory and other mental functions in humans deteriorate over time because of changes in the brain. Thus mental decline after young adulthood appeared inevitable. The truth, however, is not quite so simple.
      Stanley Rapoport at the National Institute of Health in the United States measured the flow of blood in the brains of old and young people as they completed different tasks. Since blood flow reflects neural activity. Rapoport could compare which networks of neurons were the same, the neural networks they used were significantly different. The older subjects used different internal strategies to accomplish comparable results at the same time,'Rapoport says. At the Georgia Institute of Technology, psychologist Timothy Salthouse compared a group of fast and accurate typists of college age with another group in their 60s. Both groups typed 60 words a minute. The older typists, it turned out, achieved their speed with cunning little strategies that made them more efficient than their younger counterparts. They made fewer finger shifts, gaining a fraction of a second here and there. They also read ahead in the test. The neural networks involved in typing appear to have been reshaped to compensate for losses in motor skills or other age changes.
      In fact, there's evidence that deterioration in mental functions can actually be reversed. Neuropsychologist Marion Diamond at the University of California has shown that mental activity maks neurons sprout new dendrites* which establish connections with other neurons. The dendrites shrink when the mind is idle. For example,'when a rat is kept in isolation, the animal's brain shrinks, but if we put that rat with other rats in a large cage and give them an assortment of toys, we can show, after four days, significant differences in its brain.'says Diamond. After a month in the enriched surroundings, the whole cerebral cortex has expanded, as has its blood supply.'But even in the enriched surroundings, rats get bored unless the toys are varied. Animals are just like we are. They need stimulation,'says Diamond. A busy mental lifestyle keeps the human mind fit, says Warner Schaie of Penn State University. ‘People who regularly participate in challenging tasks retain their intellectual abilities better than mental couch potatoes.'
      In his studies, Schaie detected a decline in mental function among individuals who underwent lengthy stays in hospital for chronic illness. He postulated it might be due to the mental passivity encouraged by hospital routine.One of the most profoundly important mental functions is memory. Memory exists in more than one form, what we call knowledge- facts- is what psychologists such as Harry Bahrick of Ohio Wesleyan University call semantic memory. Events, conversations and occurrences in time and space, on the other hand, make up episodic memory. It's true that episodic memory begins to decline when most people are in their 50s, but it's never perfect at any age.
      Probing the longevity of knowledge, Bahrick tested 1,000 high school graduates to see how well they remembered the school subject algebra. Some had completed the course a month before, other 50 years earlier. Surprisingly, he found that a person's grasp of algebra did not depend on how long ago he'd taken the course. The determining factor was the duration of instruction. Those who had spent only a few months learning algebra forgot most of it within two or three years while others who had been instructed for longer remembered better. According to Bahrick,'the long-term residue of knowledge remains stable over the decades, independent of the age of the person and the memory.'
      Perhaps even more important than the ability to remember is the ability to manage memory- a mental function known as metamemory.'You could say metamemory is a byproduct of going to school,'says psychologist Robert Kail of Purdue University,'The question-and-answer process,especially exam taking, helps children learn and teaches them how their memory functions.This may be one reason why the better educated a person is, the more likely they are to perform well in many aspects of life and in psychological assessments: A group of adult novice chess players were compared with a group of child experts at the game. But when asked to remember the patterns of chess pieces arranged on a board, the children won.' Because they'd played a lot of chess, their knowledge of chess was better organized than that of the adults, and their existing knowledge of chess served as a framework for new memory,'explains Kail. Cognitive style, another factor in maintaining mental function, is what Schaie calls the ability to adapt and roll with life's punches.'He measured mental flexibility with questions and tests requiring people to carry out in an offbeat way an everyday activity they had done millions of times. One example was asking people to copy a paragraph substituting uppercase letters for lowercase ones. These tests seem silly, but flexible-minded people manage to complete them,'says Schaie. The rigid person responds with tension instead and performs poorly. Those who score highly on tests of cognition at an advanced age are those who tested high in mental flexibility at middle age'.
      On a more optimistic note, one mental resource that only improves with time is specialized knowledge. Crystallised intelligence about one's occupation apparently does not decline at all until at least age 75. Vocabulary is another such specialized form of knowledge. Research clearly shows that vocabulary develops with time. Retired teachers and journalists consistently score higher on tests of vocabulary and general information than college students.`,
      multipleChoice: [
        {
          question:
            "jkl;ll",
          options: [
            "lll",
            "They had been more efficiently trained than younger typists.",
            "They used more time-saving techniques than younger typists.",
            "They had better concentration skills than younger typists.",
          ],
          correctAnswers: "B",
        },
        {
          question: "The experiment with the rats showed that",
          options: [
            "brain structure only changed when the rats were given a familiar toy ",
            "the rats became anxious after a lengthy period of time alone",
            "the rats lived longer then they were part of a social group",
            "the rats'brains expanded or shrank depending on the level of mental activity",
          ],
          correctAnswers: "B",
        },
        {
          question:
            "A comparison between adults and children who played chess showed that",
          options: [
            "the children were as capable as the adults of remembering a series of numbers",
            "the children had better recall of the layout of pieces",
            "the adults stored memories of chess moves in a more logical manner",
            "the adults had clearer memories of chess games they had played",
          ],
          correctAnswers: "B",
        },
      ],
      summaryCompletion: {
        summary:
          "Psychologists distinguish between two different types of memory: ______ and ______ memory. A study was conducted into people's knowledge of ______ to determine recall ability. This aspect of memory was found to be a function not of age but rather of length of tuition. School also helps with a brain function called ______. This is why a more highly educated person is generally more successful and does better in ______ tests. Some of our mental functions remain unaffected by age or even improve. For example, as we get older, our knowledge of ______ increases.",
        correctAnswers: [
          "semantic",
          "episodic",
          "algebra",
          "metamemory",
          "psychological",
          "vocabulary",
        ],
      },
      sentenceMatching: {
        options: [
          "Stanley Rapoport",
          "Marion Diamond",
          "Warner Schaie",
          "Harry Bahrick",
          "Robert Kail",
        ],
        questions: [
          "The educational system makes students aware of how their memory works.",
          "Although older people may use a different mental approach when completing a task, they can still achieve the same result as younger people.",
          "Being open to new ways of doing things can have a positive impact on your mental condition as we get older.",
          "Both animals and humans need to exist in an environment full of interest.",
        ],
        correctAnswers: ["E", "A", "C", "B"],
      },
    },
    part3: {
      title: "The fluoridation controversy",
      passage: `The way mental function changes is largely determined by three factors-mental lifestyle, the impact of chronic disease and flexibility of the mind.
      Experiments have shown that younger monkeys consistently outperform their older colleagues on memory tests. Formerly, psychologists concluded that memory and other mental functions in humans deteriorate over time because of changes in the brain. Thus mental decline after young adulthood appeared inevitable. The truth, however, is not quite so simple.
      Stanley Rapoport at the National Institute of Health in the United States measured the flow of blood in the brains of old and young people as they completed different tasks. Since blood flow reflects neural activity. Rapoport could compare which networks of neurons were the same, the neural networks they used were significantly different. The older subjects used different internal strategies to accomplish comparable results at the same time,'Rapoport says. At the Georgia Institute of Technology, psychologist Timothy Salthouse compared a group of fast and accurate typists of college age with another group in their 60s. Both groups typed 60 words a minute. The older typists, it turned out, achieved their speed with cunning little strategies that made them more efficient than their younger counterparts. They made fewer finger shifts, gaining a fraction of a second here and there. They also read ahead in the test. The neural networks involved in typing appear to have been reshaped to compensate for losses in motor skills or other age changes.
      In fact, there's evidence that deterioration in mental functions can actually be reversed. Neuropsychologist Marion Diamond at the University of California has shown that mental activity maks neurons sprout new dendrites* which establish connections with other neurons. The dendrites shrink when the mind is idle. For example,'when a rat is kept in isolation, the animal's brain shrinks, but if we put that rat with other rats in a large cage and give them an assortment of toys, we can show, after four days, significant differences in its brain.'says Diamond. After a month in the enriched surroundings, the whole cerebral cortex has expanded, as has its blood supply.'But even in the enriched surroundings, rats get bored unless the toys are varied. Animals are just like we are. They need stimulation,'says Diamond. A busy mental lifestyle keeps the human mind fit, says Warner Schaie of Penn State University. ‘People who regularly participate in challenging tasks retain their intellectual abilities better than mental couch potatoes.'
      In his studies, Schaie detected a decline in mental function among individuals who underwent lengthy stays in hospital for chronic illness. He postulated it might be due to the mental passivity encouraged by hospital routine.One of the most profoundly important mental functions is memory. Memory exists in more than one form, what we call knowledge- facts- is what psychologists such as Harry Bahrick of Ohio Wesleyan University call semantic memory. Events, conversations and occurrences in time and space, on the other hand, make up episodic memory. It's true that episodic memory begins to decline when most people are in their 50s, but it's never perfect at any age.
      Probing the longevity of knowledge, Bahrick tested 1,000 high school graduates to see how well they remembered the school subject algebra. Some had completed the course a month before, other 50 years earlier. Surprisingly, he found that a person's grasp of algebra did not depend on how long ago he'd taken the course. The determining factor was the duration of instruction. Those who had spent only a few months learning algebra forgot most of it within two or three years while others who had been instructed for longer remembered better. According to Bahrick,'the long-term residue of knowledge remains stable over the decades, independent of the age of the person and the memory.'
      Perhaps even more important than the ability to remember is the ability to manage memory- a mental function known as metamemory.'You could say metamemory is a byproduct of going to school,'says psychologist Robert Kail of Purdue University,'The question-and-answer process,especially exam taking, helps children learn and teaches them how their memory functions.This may be one reason why the better educated a person is, the more likely they are to perform well in many aspects of life and in psychological assessments: A group of adult novice chess players were compared with a group of child experts at the game. But when asked to remember the patterns of chess pieces arranged on a board, the children won.' Because they'd played a lot of chess, their knowledge of chess was better organized than that of the adults, and their existing knowledge of chess served as a framework for new memory,'explains Kail. Cognitive style, another factor in maintaining mental function, is what Schaie calls the ability to adapt and roll with life's punches.'He measured mental flexibility with questions and tests requiring people to carry out in an offbeat way an everyday activity they had done millions of times. One example was asking people to copy a paragraph substituting uppercase letters for lowercase ones. These tests seem silly, but flexible-minded people manage to complete them,'says Schaie. The rigid person responds with tension instead and performs poorly. Those who score highly on tests of cognition at an advanced age are those who tested high in mental flexibility at middle age'.
      On a more optimistic note, one mental resource that only improves with time is specialized knowledge. Crystallised intelligence about one's occupation apparently does not decline at all until at least age 75. Vocabulary is another such specialized form of knowledge. Research clearly shows that vocabulary develops with time. Retired teachers and journalists consistently score higher on tests of vocabulary and general information than college students.`,
      multipleChoice: [
        {
          question:
            "What does the writer say about the performance of older typists on the test?",
          options: [
            "They used different motor skills from younger typists.",
            "They had been more efficiently trained than younger typists.",
            "They used more time-saving techniques than younger typists.",
            "They had better concentration skills than younger typists.",
          ],
          correctAnswers: "B",
        },
        {
          question: "The experiment with the rats showed that",
          options: [
            "brain structure only changed when the rats were given a familiar toy ",
            "the rats became anxious after a lengthy period of time alone",
            "the rats lived longer then they were part of a social group",
            "the rats'brains expanded or shrank depending on the level of mental activity",
          ],
          correctAnswers: "B",
        },
        {
          question:
            "A comparison between adults and children who played chess showed that",
          options: [
            "the children were as capable as the adults of remembering a series of numbers",
            "the children had better recall of the layout of pieces",
            "the adults stored memories of chess moves in a more logical manner",
            "the adults had clearer memories of chess games they had played",
          ],
          correctAnswers: "B",
        },
        {
          question:
            "What does the writer say about the performance of older typists on the test?",
          options: [
            "They used different motor skills from younger typists.",
            "They had been more efficiently trained than younger typists.",
            "They used more time-saving techniques than younger typists.",
            "They had better concentration skills than younger typists.",
          ],
          correctAnswers: "B",
        },
      ],
      summaryCompletion: {
        summary:
          "Psychologists distinguish between two different types of memory: ______ and ______ memory. A study was conducted into people's knowledge of ______ to determine recall ability. This aspect of memory was found to be a function not of age but rather of length of tuition. School also helps with a brain function called ______. This is why a more highly educated person is generally more successful and does better in ______ tests. Some of our mental functions remain unaffected by age or even improve. For example, as we get older, our knowledge of ______ increases.",
        correctAnswers: [
          "semantic",
          "episodic",
          "algebra",
          "metamemory",
          "psychological",
          "vocabulary",
        ],
      },
      sentenceMatching: {
        options: [
          "Stanley Rapoport",
          "Marion Diamond",
          "Warner Schaie",
          "Harry Bahrick",
          "Robert Kail",
        ],
        questions: [
          "The educational system makes students aware of how their memory works.",
          "Although older people may use a different mental approach when completing a task, they can still achieve the same result as younger people.",
          "Being open to new ways of doing things can have a positive impact on your mental condition as we get older.",
          "Both animals and humans need to exist in an environment full of interest.",
        ],
        correctAnswers: ["E", "A", "C", "B"],
      },
    },
  },
];
