import React from "react";
import Timer from "../partials/Timer";
import { GiPayMoney } from "react-icons/gi";
import CountUp from "react-countup";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const AgentCard = ({ char, data, hero }) => {
  return (
    <div className={`agentCard ${hero ? "hero" : ""}`}>
      <div className="status-container">
        <div
          className={`status-bulb ${
            char.status === "active"
              ? "live"
              : char.status === "upcoming"
              ? "upcoming"
              : "inactive"
          }`}
        ></div>
        <p>{char.status === "active" ? "LIVE" : char.status}</p>
      </div>
      <div>
        <div className="agent-card-content-top">
          <div>
            <img
              className="pointer"
              onClick={() => {
                window.open(`/agent/${char.name}`, "_blank");
              }}
              src={char.pfp}
              alt={char.name}
            />
          </div>
          <div className="challenge-card-info">
            <h2
              className="pointer"
              onClick={() => {
                window.open(`/agent/${char.name}`, "_blank");
              }}
            >
              {char.name}
            </h2>
            <p className={`level ${char.level}`}>{char.level}</p>
            <div className="agent-card-prize-pool">
              <span>Prize Pool</span>
              <CountUp
                start={0}
                end={
                  char.usd_prize
                    ? char.usd_prize
                    : char.winning_prize
                    ? char.winning_prize * data?.solPrice
                    : char.entryFee * data?.solPrice * char.fee_multiplier
                }
                duration={2.75}
                decimals={0}
                decimal="."
                prefix="$"
              />
            </div>
          </div>
        </div>
        <hr />
        <p>{char.label}</p>

        <div className="agent-card-content-bottom">
          {char.status === "upcoming" ? (
            <div className="upcoming-timer">
              <p
                style={{
                  fontSize: "14px",
                  color: "#0bbf99",
                  fontWeight: "bold",
                }}
              >
                Starts in ↓
              </p>
              {char.start_date ? (
                <Timer expiryDate={char.start_date} />
              ) : (
                <p>TBA</p>
              )}
            </div>
          ) : (
            <button
              className="pointer"
              onClick={() => window.open(`/break/${char.name}`, "_blank")}
            >
              {char.status === "active" ? "Break" : "View"} {char.name} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
