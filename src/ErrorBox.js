import React from "react";

const styles = {
  padding: "8px",
  margin: "12px 0",
  backgroundColor: "rgba(255, 0, 0, 0.2)",
  color: "rgba(255, 0, 0, 0.7)",
  border: "1px solid rgba(255, 0, 0, 0.6)"
};

export default function({ children }) {
  return <div style={styles}>{children}</div>;
}
