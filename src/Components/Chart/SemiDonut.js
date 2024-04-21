import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Box, Typography } from "@mui/material";

class Example extends PureComponent {
  render() {
    const { totalEmployees } = this.props;

    const remainingValue = 100 - totalEmployees;

    const blueColor = "#2980b9";
    const redColor = "#e74c3c";

    const percentage = (totalEmployees / 100) * 100;

    const blueSection = Math.min(percentage, 10);
    const redSection = Math.max(Math.min(percentage - 10, 40), 0);

    return (
      <Box style={{ position: "relative", overflow: "hidden" }}>
        <PieChart width={320} height={150}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={[
              { name: "Blue", value: blueSection, color: blueColor },
              { name: "Red", value: redSection, color: redColor },
              { name: "Remaining", value: remainingValue, color: "#f5f6fa" },
            ]}
            cx={150}
            cy={120}
            innerRadius={80}
            outerRadius={110}
            fill="#C0C0C0"
            stroke="none"
          >
            <Cell fill={blueColor} />
            <Cell fill={redColor} />
          </Pie>
        </PieChart>

        <Box style={textStyle}>
          <Typography variant="h5" fontWeight={500} color="primary">
            {totalEmployees}
          </Typography>
          <Typography variant="body1" fontSize={15} color={"gray"}>
            Employee{totalEmployees !== 1 ? "s" : ""}
          </Typography>
        </Box>
      </Box>
    );
  }
}

const textStyle = {
  position: "absolute",
  top: "70%",
  left: "45%",
  transform: "translate(-50%, -50%)",
  zIndex: "99",
  textAlign: "center",
};

export default Example;
