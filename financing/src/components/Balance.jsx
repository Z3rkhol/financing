import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Balance.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function Balance(props) {
  const income = props.income || 0;
  const expenses = props.expenses || 0;

  const balance = props.income - props.expenses;
  const data = {
    labels: ['Příjem', 'Výdaje'],
    datasets: [
      {
        label: 'Přehled financí',
        data: [props.income, props.expenses],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="balance-card text-center">
      <Card.Header><strong>Finanční Přehled</strong></Card.Header>
      <Card.Body>
        <Doughnut data={data} />
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem><strong>Aktuální zůstatek:</strong> {balance.toFixed(2)} CZK</ListGroupItem>
        <ListGroupItem><strong>Celkový příjem:</strong> {props.income.toFixed(2)} CZK</ListGroupItem>
        <ListGroupItem><strong>Celkové výdaje:</strong> {props.expenses.toFixed(2)} CZK</ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default Balance;