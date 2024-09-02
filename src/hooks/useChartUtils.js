import { Chart } from 'chart.js';
import React from 'react'

export const useChartUtils = () => {
    // 차트 그리는 함수
    const drawChart = (chartRef, chartEI, compare, prepare, myBudget) => {
        if (chartRef.current) {
            chartRef.current.destroy(); // 이전 차트 인스턴스가 있을 경우 제거
        }

        chartRef.current = new Chart(chartEI, {
            type: 'bar',
            data: {
                labels: ["예상 비용", "적정 비용"],
                datasets: [
                    {
                        label: "원",
                        backgroundColor: compare.message ? ["#F14A4A", "#5D5FEF"] : ["#C1BEFF", "#5D5FEF"],
                        data: [prepare, myBudget]
                    }
                ]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: '예상 비용과 적정 비용'
                }
            }
        });
    }
  return {
    drawChart
  }
}
