import React from "react";
import StatisticLine from './StatisticLine'
const Statistics = ({ good, neutral, bad, all }) => {
  const avgScr = (good, neutral, bad, all) => {
    return (good * 1 + neutral * 0 + bad * -1) / all;
  };
  const positive = (good, all) => {
    return `${(good / all) * 100} %`;
  };
  return (
    <div>
      <h2>Statistics</h2>
      {good || bad || neutral || all ? (
        <table>
        <tbody>
        <StatisticLine text = 'good' value = {good} />
        <StatisticLine text = 'neutral' value = {neutral} />
        <StatisticLine text = 'bad' value = {bad} />
        <StatisticLine text = 'all' value = {good + bad + neutral} />
        <StatisticLine text = 'average' value = {avgScr(good, neutral, bad, all)} />
        <StatisticLine text = 'positive' value = {positive(good, all)} />
        </tbody>
        </table>
      ) : (
        <p>No Feedback given</p>
      )}
    </div>
  );
};

export default Statistics;
