const destinations = [
  { label: "Closest Starbucks", value: 0.5, unit: "light milliseconds", description: "~150 kilometers" },
  { label: "LA to NYC", value: 13.15, unit: "light milliseconds", description: "~3,944 kilometers" },
  { label: "Moon", value: 1.3, unit: "light seconds", description: "~384,400 km" },
  { label: "Sun", value: 8.3, unit: "light minutes", description: "~150 million km" },
  { label: "Edge of Solar System", value: 4.1, unit: "light hours", description: "~18 billion km" },
  { label: "1 Light Year", value: 1, unit: "light years", description: "~9.46 trillion km" },
  { label: "Proxima Centauri", value: 4.2, unit: "light years", description: "~40 trillion km" },
  { label: "Edge of Milky Way", value: 100000, unit: "light years", description: "100,000 light years" },
  { label: "Andromeda Galaxy", value: 2500000, unit: "light years", description: "2.5 million light years" }
];

const velocitySlider = document.getElementById("velocity-slider");
const destinationSlider = document.getElementById("destination-slider");
const velocityDisplay = document.getElementById("velocity-display");
const destinationDisplay = document.getElementById("destination-display");
const travelerTimeDisplay = document.getElementById("traveler-time");
const observerTimeDisplay = document.getElementById("observer-time");
const gammaDisplay = document.getElementById("gamma-display");

const c = 299792458; // Speed of light in m/s

const calculateGamma = (velocityFraction) => {
  return 1 / Math.sqrt(1 - velocityFraction ** 2);
};

const calculateTimeDilation = (distance, unit, velocityFraction) => {
  const gamma = calculateGamma(velocityFraction);

  const distanceInSeconds = (() => {
    switch (unit) {
      case "light milliseconds":
        return distance / 1000;
      case "light seconds":
        return distance;
      case "light minutes":
        return distance * 60;
      case "light hours":
        return distance * 3600;
      case "light years":
        return distance * 365.25 * 24 * 3600;
      default:
        return distance;
    }
  })();

  const properTime = distanceInSeconds / velocityFraction;
  const observerTime = properTime * gamma;

  return { properTime, observerTime, gamma };
};

const updateValues = () => {
  const velocityFraction = velocitySlider.value / 100;
  const destination = destinations[destinationSlider.value];

  velocityDisplay.textContent = `${(velocityFraction * 100).toFixed(2)}%`;
  destinationDisplay.textContent = destination.label;

  const { properTime, observerTime, gamma } = calculateTimeDilation(
    destination.value,
    destination.unit,
    velocityFraction
  );

  travelerTimeDisplay.textContent = `${properTime.toFixed(4)} seconds`;
  observerTimeDisplay.textContent = `${observerTime.toFixed(4)} seconds`;
  gammaDisplay.textContent = gamma.toFixed(2);
};

velocitySlider.addEventListener("input", updateValues);
destinationSlider.addEventListener("input", updateValues);

updateValues(); // Initialize values
