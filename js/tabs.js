// Tab navigation functionality

function showTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');

    // Resize charts when tab becomes visible
    setTimeout(() => {
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.resize();
        });
    }, 100);
}

// Initialize chart resize on window resize
function initializeChartResize() {
    window.addEventListener('resize', () => {
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.resize();
        });
    });
}

// Make showTab globally available
window.showTab = showTab;
