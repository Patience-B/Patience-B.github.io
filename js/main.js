// Main application initialization and orchestration

// Main initialization function
function initializeApp() {
    // Process the raw data
    const processedData = processData(data);
    
    // Calculate statistics
    const stats = calculateStats(processedData);
    
    // Process weekly data
    const weeklyArray = processWeeklyData(processedData);
    
    // Update overview statistics
    updateOverviewStats(stats);
    
    // Render goal comparison
    renderGoalComparison(processedData, stats);
    
    // Initialize all charts
    initializeCharts(processedData, stats, weeklyArray);
    
    // Render weekly stats cards
    renderWeeklyStats(weeklyArray);
    
    // Render accomplishments
    renderAccomplishments(data);
    
    // Initialize chart resize functionality
    initializeChartResize();
    
    console.log('Dashboard initialized successfully!');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
