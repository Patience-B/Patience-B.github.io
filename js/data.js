// Data and configuration file
const data = [
    { date: "18/08/2025", week: "18/08/2025", bible: 99, steps: 10000, sand: 3, portfolio: 0.5, screenTime: "8:34:00", accomplishment: "" },
    { date: "19/08/2025", week: "18/08/2025", bible: 28, steps: 7600, sand: 2.5, portfolio: 0, screenTime: "2:09:00", accomplishment: "Went for lunch with Charity at T-star Talked with Timothy for almost 2 hours" },
    { date: "20/08/2025", week: "18/08/2025", bible: 0, steps: 2000, sand: 3, portfolio: 0, screenTime: "6:25:00", accomplishment: "Picked Tasha from School" },
    { date: "21/08/2025", week: "18/08/2025", bible: 1, steps: 4000, sand: 2.5, portfolio: 0, screenTime: "6:23:00", accomplishment: "Attend Xplore Study with Timothy" },
    { date: "22/08/2025", week: "18/08/2025", bible: 56, steps: 4000, sand: 2, portfolio: 0, screenTime: "10:42:00", accomplishment: "Got my money issue sorted for July and August because Micaela reached out to me" },
    { date: "23/08/2025", week: "18/08/2025", bible: 0, steps: 5000, sand: 0, portfolio: 0, screenTime: "13:59:00", accomplishment: "Re-organized my room and picked up fixed chair" },
    { date: "24/08/2025", week: "18/08/2025", bible: 27, steps: 8500, sand: 0, portfolio: 0, screenTime: "3:27:00", accomplishment: "Went for Jonathan's last wedding meeting. Met Giki again. " },
    { date: "25/08/2025", week: "25/08/2025", bible: 161, steps: 0, sand: 2, portfolio: 0, screenTime: "4:12:00", accomplishment: "" },
    { date: "26/08/2025", week: "25/08/2025", bible: 0, steps: 4000, sand: 1, portfolio: 2, screenTime: "2:47:00", accomplishment: "Went for games" },
    { date: "27/08/2025", week: "25/08/2025", bible: 0, steps: 0, sand: 2, portfolio: 0, screenTime: "10:00:00", accomplishment: "" },
    { date: "28/08/2025", week: "25/08/2025", bible: 22, steps: 0, sand: 6, portfolio: 0, screenTime: "9:50:00", accomplishment: "" },
    { date: "29/08/2025", week: "25/08/2025", bible: 0, steps: 4000, sand: 4, portfolio: 0, screenTime: "4:11:00", accomplishment: "Spent a lovely evening with Matthew. Did a presentation at work." },
    { date: "30/08/2025", week: "25/08/2025", bible: 0, steps: 2000, sand: 0, portfolio: 0, screenTime: "5:31:00", accomplishment: "Went to visit the Jerry. " },
    { date: "31/08/2025", week: "25/08/2025", bible: 42, steps: 6500, sand: 1, portfolio: 0, screenTime: "4:58:00", accomplishment: "" },
    { date: "01/09/2025", week: "01/09/2025", bible: 15, steps: 7500, sand: 2, portfolio: 2, screenTime: "2:59:00", accomplishment: "Did a presentation for Precise conference" },
    { date: "02/09/2025", week: "01/09/2025", bible: 66, steps: 0, sand: 1.5, portfolio: 0, screenTime: "10:59:00", accomplishment: "" }
];

// Goals configuration
const goals = {
    bible: 14, // ~100 verses per week / 7 days
    steps: 7000,
    sand: 5,
    portfolio: 1,
    screenTimeMax: 3
};

// Chart color palette
const colors = {
    bible: '#8884d8',
    steps: '#82ca9d', 
    sand: '#ffc658',
    portfolio: '#ff7300',
    screenTime: '#ff6b6b',
    goal: '#ff7300',
    achieved: '#28a745',
    missed: '#dc3545'
};
