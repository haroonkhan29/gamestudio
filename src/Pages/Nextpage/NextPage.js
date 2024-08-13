import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const NextPage = () => {
  
  
  const [showWelcome, setShowWelcome] = useState(false);

  const [expenses, setExpenses] = useState([
  { category: 'Employee Costs', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Salaries', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Bonus', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Office Costs', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Office Rent', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: "Girl's Hostel", 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Electric Bill', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Office Miscellaneous(main Bahria town)', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Telephone', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Internet Bill', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Testing Devices', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Pending Tax', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Petty Cash', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Legal & Professional Charges', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Govt.Fees', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Marketing Costs', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Rating & Reviews', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Social media Marketing', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Miscellaneous expenses', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Events/Activities', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Birthday costs', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
  { category: 'Monthly Dinner', 'Jan': '', 'Feb': '', 'Mar': '', 'Apr': '', 'May': '', 'Jun': '', 'Jul': '', 'Aug': '', 'Sep': '', 'Oct': '', 'Nov': '', 'Dec': '' },
]);
const [changesMade, setChangesMade] = useState(false);
const currentCellRef = useRef(null);

const handleNextButtonClick = () => {
  setShowWelcome(true);
};
const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1); 
  };
const [isSaving, setIsSaving] = useState(false); 
const [savingSuccess, setSavingSuccess] = useState(false); 

const handleChange = (e, category, month) => {
  const updatedExpenses = [...expenses];
  updatedExpenses.find(expense => expense.category === category)[month] = e.target.value;
  setExpenses(updatedExpenses);
  setChangesMade(true);
};
const handleKeyDown = (e, category, month) => {
if (e.key === 'Enter') {
  const inputs = document.getElementsByTagName('input');
  const index = Array.prototype.indexOf.call(inputs, e.target);
  const numCols = Object.keys(expenses[0]).length - 1;
  const nextIndex = index + numCols; 
  
  if (nextIndex < inputs.length) {
    inputs[nextIndex].focus();
  }
} else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
  const inputs = document.getElementsByTagName('input');
  const index = Array.prototype.indexOf.call(inputs, e.target);
  const numRows = expenses.length;
  const numCols = Object.keys(expenses[0]).length - 1;
  let nextIndex;
  if (e.key === 'ArrowUp') {
    nextIndex = index - numCols;
  } else if (e.key === 'ArrowDown') {
    nextIndex = index + numCols;
  }

  if (nextIndex >= 0 && nextIndex < inputs.length) {
    inputs[nextIndex].focus();
  }
} else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
  const inputs = document.getElementsByTagName('input');
  const index = Array.prototype.indexOf.call(inputs, e.target);
  const numCols = Object.keys(expenses[0]).length - 1;
  let nextIndex;

  if (e.key === 'ArrowLeft') {
    nextIndex = index - 1;
  } else if (e.key === 'ArrowRight') {
    nextIndex = index + 1;
  }

  if (nextIndex >= 0 && nextIndex < inputs.length && Math.floor(nextIndex / numCols) === Math.floor(index / numCols)) {
    inputs[nextIndex].focus();
  }
} else if (e.key === 'Home' || e.key === 'End') {
  const inputs = document.getElementsByTagName('input');
  const index = Array.prototype.indexOf.call(inputs, e.target);
  const numCols = Object.keys(expenses[0]).length - 1;
  const currentRow = Math.floor(index / numCols);
  let nextIndex;

  if (e.key === 'Home') {
    nextIndex = currentRow * numCols + 1; 
  } else if (e.key === 'End') {
    nextIndex = (currentRow + 1) * numCols; 
  }

  if (nextIndex >= 0 && nextIndex < inputs.length) {
    inputs[nextIndex].focus();
  }
}
};

const handleSave = async () => {
  try {
    const startTime = new Date(); 
    setIsSaving(true); 

    const expensesToUpdate = expenses.filter(expense => {
      return (
        expense.category !== 'Employee Costs' && 
        expense.category !== 'Office Costs' && 
        expense.category !== 'Marketing Costs' && 
        expense.category !== 'Events/Activities' && 
        Object.values(expense).some(value => value.trim() !== '' && value.trim() !== '')
      );
    });


    await Promise.all(
      expensesToUpdate.map(async (expense) => {
        const updatedMonths = Object.entries(expense)
          .filter(([key, value]) => key !== 'category' && value.trim() !== '');
          await Promise.all(
          updatedMonths.map(([month, value]) =>
          fetch('http://18.217.96.83:3001/cash', { 
          method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                category: expense.category,
                month,
                value
              })
            })
          )
        );
      })
    );
    const endTime = new Date(); 
    const savingTime = endTime - startTime; 

    setChangesMade(false);
    setSavingSuccess(true); 

    setTimeout(() => {
      setSavingSuccess(false);
    }, 3000);
  } catch (error) {
    console.error('Error saving expense:', error.message);
  } finally {
    setIsSaving(false); 
  }
};
useEffect(() => {
  const fetchExpenseData = async () => {
    try {
      const response = await fetch(`http://18.217.96.83:3001/cash`);
      if (!response.ok) {
        throw new Error('Failed to fetch expense data');
      }
      let data = await response.json();
      const salariesIndex = data.findIndex(expense => expense.category === 'Salaries');
      const pettyCashIndex = data.findIndex(expense => expense.category === 'Office Rent');
      const ratingIndex = data.findIndex(expense => expense.category === 'Rating & Reviews');
      const MiscellaneousIndex = data.findIndex(expense => expense.category === 'Miscellaneous expenses');

     if (salariesIndex !== -1) {
    const newData = [...data];
   newData.splice(salariesIndex, 0 , { 
  category: 'Employee Costs',
  'Jan': 'Jan',
    'Feb': 'Feb',
    'Mar': 'Mar',
    'Apr': 'Apr',
    'May': 'May',
    'Jun': 'Jun',
    'Jul': 'Jul',
    'Aug': 'Aug',
    'Sep': 'Sep',
    'Oct': 'Oct',
    'Nov': 'Nov',
    'Dec': 'Dec',
});
data = newData;
}
if (pettyCashIndex !== -1) {
const newData = [...data];
newData.splice(pettyCashIndex + 1, 0, { 
  category: 'Office Costs',
  'Jan': 'Jan',
  'Feb': 'Feb',
  'Mar': 'Mar',
  'Apr': 'Apr',
  'May': 'May',
  'Jun': 'Jun',
  'Jul': 'Jul',
  'Aug': 'Aug',
  'Sep': 'Sep',
  'Oct': 'Oct',
  'Nov': 'Nov',
  'Dec': 'Dec',
});
data = newData;
}
if (ratingIndex !== -1) {
const newData = [...data];
newData.splice(ratingIndex + 2 , 0, { 
  category: 'Marketing Costs',
  'Jan': 'Jan',
  'Feb': 'Feb',
  'Mar': 'Mar',
  'Apr': 'Apr',
  'May': 'May',
  'Jun': 'Jun',
  'Jul': 'Jul',
  'Aug': 'Aug',
  'Sep': 'Sep',
  'Oct': 'Oct',
  'Nov': 'Nov',
  'Dec': 'Dec',
});
data = newData;
}

if (MiscellaneousIndex !== -1) {
const newData = [...data];
newData.splice(MiscellaneousIndex + 4 , 0, { 
  category: 'Events/Activities',
  'Jan': 'Jan',
    'Feb': 'Feb',
    'Mar': 'Mar',
    'Apr': 'Apr',
    'May': 'May',
    'Jun': 'Jun',
    'Jul': 'Jul',
    'Aug': 'Aug',
    'Sep': 'Sep',
    'Oct': 'Oct',
    'Nov': 'Nov',
    'Dec': 'Dec',
});
data = newData;
}

      setExpenses(data); 
    } catch (error) {
      console.error('Error fetching expense data:', error.message);
    }
  };
  fetchExpenseData();
}, []);

return (
  <div className="expense-sheet-container">
      <div className="headere">
        <h1>Expense 2024</h1>
        <div className="save-button-container">
        {changesMade && !isSaving && (
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        )}
        {isSaving && <p>Saving...</p>}
        {savingSuccess && <p className="success-message">Saving successful!</p>}
        <Link to="/next-page">
            {/* <button className="next-button" onClick={handleNextButtonClick}>
              2024
            </button> */}
          </Link>
      </div>
      <button onClick={handleBackButtonClick}>Back</button>
      {showWelcome && <h2>Hello, Welcome!</h2>}

      </div>  
      <table className="customs-table">
        <thead>
        <tr className="month-header">
        <th className="expense-header" colSpan="">Actual Expenses</th>
            <th>JAN</th>
            <th>FEB</th>
            <th>MAR</th>
            <th>APR</th>
            <th>MAY</th>
            <th>JUN</th>
            <th>JUL</th>
            <th>AUG</th>
            <th>SEPT</th>
            <th>OCT</th>
            <th>NOV</th>
            <th>DEC</th>
            <th className="year-header" colSpan="">YEAR</th>
          </tr>
        </thead>
        <tbody>
  {expenses.map((expense, index) => (
    <React.Fragment key={index}>
      <tr className={expense.category === 'Employee Costs' || expense.category === 'Office Costs' || expense.category === 'Marketing Costs' || expense.category === 'Events/Activities' ? 'pink-background' : expense.category === 'Salaries' || expense.category === 'Bonus' || expense.category === 'Office Rent' || expense.category === "Girl's Hostel" || expense.category === 'Electric Bill' || expense.category === 'Office Miscellaneous(main Bahria town)' || expense.category === 'Telephone' || expense.category === 'Internet Bill' || expense.category === 'Testing Devices' ||  expense.category === 'Pending Tax' || expense.category === 'Petty Cash'  || expense.category === 'Legal & Professional Charges' || expense.category === 'Govt.Fees'|| expense.category === 'Rating & Reviews' || expense.category === 'Social media Marketing' || expense.category === 'Miscellaneous expenses' || expense.category === 'Birthday costs' || expense.category === 'Monthly Dinner' ? 'bold-red-row' : ''}>
        <td className={expense.category === 'Employee Costs' || expense.category === 'Office Costs' || expense.category === 'Marketing Costs' || expense.category === 'Events/Activities' ? 'bold-category' : ''}>{expense.category}</td>
        {Object.keys(expense).slice(1).map((month, index) => (
          <td key={index}>
            {['Employee Costs', 'Office Costs', 'Marketing Costs', 'Events/Activities'].includes(expense.category) ? (
              <span>{expense[month]}</span>
            ) : (
              <input
                type="text"
                value={expense[month] === '0' ? '' : expense[month]}                 onChange={(e) => handleChange(e, expense.category, month)}
                 onKeyDown={(e) => handleKeyDown(e, expense.category, month)}
                 />
            )}
          </td>
        ))}
        {!['Employee Costs', 'Office Costs', 'Marketing Costs', 'Events/Activities'].includes(expense.category) && (
          <td>
            {Object.values(expense).slice(1).reduce((acc, val) => {
              if (val && !isNaN(parseInt(val.replace(',', '')))) {
                return acc + parseInt(val.replace(',', ''));
              }
              return acc;
            }, 0)}
          </td>
        )}
      </tr>
      {expense.category === 'Bonus' && (
  <tr className="green-background">
  <td className="subtotal-cell">SubTotal</td>
    {Object.keys(expense).slice(1).map((month, index) => (
      <td key={index} className="subtotal-year">
        {expenses.reduce((acc, exp) => {
          if (exp.category === 'Salaries' || exp.category === 'Bonus') {
            const val = exp[month];
            if (val && !isNaN(parseInt(val.replace(',', '')))) {
              return acc + parseInt(val.replace(',', ''));
            }
          }
          return acc;
        }, 0)}
      </td>
    ))}
    <td className="subtotal-value">
      {expenses.reduce((acc, exp) => {
        if (exp.category === 'Salaries' || exp.category === 'Bonus') {
          return acc + Object.values(exp).slice(1).reduce((acc, val) => {
            if (val && !isNaN(parseInt(val.replace(',', '')))) {
              return acc + parseInt(val.replace(',', ''));
            }
            return acc;
          }, 0);
        }
        return acc;
      }, 0)}
    </td>
  </tr>
)}
      {expense.category === 'Govt.Fees' && (
  <tr className="green-background">
  <td className="subtotal-cell">SubTotal</td>
    {Object.keys(expense).slice(1).map((month, index) => (
      <td key={index} className="subtotal-year">
        {expenses.reduce((acc, exp) => {
          if (exp.category === 'Office Rent' || exp.category ===  "Girl's Hostel" || exp.category ===  'Electric Bill' ||  exp.category === 'Office Miscellaneous(main Bahria town)' || exp.category === 'Telephone' || exp.category ===  'Internet Bill' || exp.category ===  "Testing Devices" || exp.category ===  'Pending Tax' || exp.category ===  'Petty Cash' || exp.category ===  'Legal & Professional Charges'  || exp.category ===  ' Govt.Fees') {
            const val = exp[month];
            if (val && !isNaN(parseInt(val.replace(',', '')))) {
              return acc + parseInt(val.replace(',', ''));
            }
          }
          return acc;
        }, 0)}
      </td>
    ))} 
    <td className="subtotal-value">
      {expenses.reduce((acc, exp) => {
          if (exp.category === 'Office Rent' || exp.category ===  "Girl's Hostel" || exp.category ===  'Electric Bill' ||  exp.category === 'Office Miscellaneous(main Bahria town)' || exp.category === 'Telephone' || exp.category ===  'Internet Bill' || exp.category === 'Testing Devices' || exp.category === 'Pending Tax' || exp.category ===  'Petty Cash' || exp.category ===  'Legal & Professional Charges' || exp.category ===  'Govt.Fees') {
            return acc + Object.values(exp).slice(1).reduce((acc, val) => {
            if (val && !isNaN(parseInt(val.replace(',', '')))) {
              return acc + parseInt(val.replace(',', ''));
            }
            return acc;
          }, 0);
        }
        return acc;
      }, 0)}
    </td>
  </tr>
)}
{['Miscellaneous expenses'].includes(expense.category) && (
  <tr className="green-background">
  <td className="subtotal-cell">SubTotal</td>
    {Object.keys(expense).slice(1).map((month, index) => (
      <td key={index} className="subtotal-year">
        {expenses.reduce((acc, exp) => {
          if (['Rating & Reviews', 'Social media Marketing', 'Miscellaneous expenses'].includes(exp.category)) {
            const val = exp[month];
            if (val && !isNaN(parseInt(val.replace(',', '')))) {
              return acc + parseInt(val.replace(',', ''));
            }
          }
          return acc;
        }, 0)}
      </td>
    ))}
    <td className="subtotal-value">
      {expenses.reduce((acc, exp) => {
        if (['Rating & Reviews', 'Social media Marketing', 'Miscellaneous expenses'].includes(exp.category)) {
          return acc + Object.values(exp).slice(1).reduce((acc, val) => {
            if (val && !isNaN(parseInt(val.replace(',', '')))) {
              return acc + parseInt(val.replace(',', ''));
            }
            return acc;
          }, 0);
        }
        return acc;
      }, 0)}
    </td>
  </tr>
)}
   {['Monthly Dinner'].includes(expense.category) && (
  <tr className="green-background">
  <td className="subtotal-cell">SubTotal</td>
    {Object.keys(expense).slice(1).map((month, index) => (
      <td key={index} className="subtotal-year">
        {expenses.reduce((acc, exp) => {
          if (['Birthday costs', 'Monthly Dinner'].includes(exp.category)) {
            const val = exp[month];
            if (val && !isNaN(parseInt(val.replace(',', '')))) {
              return acc + parseInt(val.replace(',', ''));
            }
          }
          return acc;
        }, 0)}
      </td>
    ))}
    <td className="subtotal-value">
      {expenses.reduce((acc, exp) => {
        if (['Birthday costs', 'Monthly Dinner'].includes(exp.category)) {
          return acc + Object.values(exp).slice(1).reduce((acc, val) => {
            if (val && !isNaN(parseInt(val.replace(',', '')))) {
              return acc + parseInt(val.replace(',', ''));
            }
            return acc;
          }, 0);
        }
        return acc;
      }, 0)}
    </td>
  </tr>
)}
    </React.Fragment>
  ))}
<tr>
  <td className="total-cell">Total Expenses</td>
  {Object.keys(expenses[0]).slice(1).map((month, index) => (
    <td key={index} className="total-year pink-background">{month}</td>
  ))}
</tr>

  <tr>
    <td className="bold-cell">Total Expenses</td>
    {Object.keys(expenses[0]).slice(1).map((month, index) => (
      <td key={index} className="total-year">
        {expenses.reduce((acc, expense) => {
          const val = expense[month];
          if (val && !isNaN(parseInt(val.replace(',', '')))) {
            return acc + parseInt(val.replace(',', ''));
          }
          return acc;
        }, 0)}
      </td>
    ))}
    <td className="total-value">
      {expenses.reduce((acc, expense) => {
        return acc + Object.values(expense).slice(1).reduce((acc, val) => {
          if (val && !isNaN(parseInt(val.replace(',', '')))) {
            return acc + parseInt(val.replace(',', ''));
          }
          return acc;
        }, 0);
      }, 0)}
    </td>
  </tr>
</tbody>
      </table>
    </div>
  );
};


export default NextPage;
