import React from "react";
import "./ResultsDisplay.css";
const ResultDisplay = ({ result }) => {
    if (!result) return <p>Loading result...</p>;

    const { prediction, confidence, class: tumorClass, all_predictions } = result;

    return (
        <div className="result-container" style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Prediction Result</h2>
            <p><strong>Predicted Class:</strong> {tumorClass.replace("_", " ").toUpperCase()}</p>
            <p><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>

            <h3>All Class Probabilities:</h3>
            <ul>
                {Object.entries(all_predictions).map(([key, value]) => (
                    <li key={key}>
                        {key.replace("_", " ")}: {(value * 100).toFixed(2)}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultDisplay;
