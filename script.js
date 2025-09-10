class DigitalClock {
    constructor() {
        this.yearEl = document.getElementById('year');
        this.monthEl = document.getElementById('month');
        this.dayEl = document.getElementById('day');
        this.dayNameEl = document.getElementById('dayName');
        this.hourEl = document.getElementById('hour');
        this.minuteEl = document.getElementById('minute');
        this.secondEl = document.getElementById('second');
        this.ampmEl = document.getElementById('ampm');
        
        this.dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        
        this.init();
    }
    
    init() {
        this.updateClock();
        // Update every second
        setInterval(() => this.updateClock(), 1000);
    }
    
    updateClock() {
        const now = new Date();
        
        // Get date components
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dayName = this.dayNames[now.getDay()];
        
        // Get time components
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Determine AM/PM and convert to 12-hour format
        const isAM = hours < 12;
        if (hours === 0) {
            hours = 12;
        } else if (hours > 12) {
            hours = hours - 12;
        }
        
        const displayHours = String(hours).padStart(2, '0');
        
        // Update display elements
        this.updateElement(this.yearEl, year);
        this.updateElement(this.monthEl, month);
        this.updateElement(this.dayEl, day);
        this.updateElement(this.dayNameEl, dayName);
        this.updateElement(this.hourEl, displayHours);
        this.updateElement(this.minuteEl, minutes);
        this.updateElement(this.secondEl, seconds);
        
        // Update AM/PM display
        this.updateAmPm(isAM);
    }
    
    updateElement(element, value) {
        if (element.textContent !== String(value)) {
            element.textContent = value;
            this.flashElement(element);
        }
    }
    
    updateAmPm(isAM) {
        this.ampmEl.innerHTML = isAM ? 
            '<span class="active">AM</span><br><span class="inactive">PM</span>' :
            '<span class="inactive">AM</span><br><span class="active">PM</span>';
    }
    
    flashElement(element) {
        // Add flash effect when number changes
        element.style.opacity = '0.5';
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 200);
    }
}

// Add styles for AM/PM active/inactive states
const style = document.createElement('style');
style.textContent = `
    .am-pm .active {
        color: #00ff00;
    }
    
    .am-pm .inactive {
        color: #333;
    }
`;
document.head.appendChild(style);

// Initialize the clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DigitalClock();
});

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to display numbers
    const displayNumbers = document.querySelectorAll('.display-number');
    displayNumbers.forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
            }, 150);
        });
    });
    
    // Add subtle opacity breathing effect to the container
    const container = document.querySelector('.clock-container');
    setInterval(() => {
        container.style.opacity = '0.9';
        
        setTimeout(() => {
            container.style.opacity = '1';
        }, 1000);
    }, 2000);
});
