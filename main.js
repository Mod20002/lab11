const root = document.getElementById('root');
ReactDOM.render(<App />, root);
// function Counter(props) {
//   const {item : {id, number}, hdlUpdate} = props

function Counter(props) {
  console.log(props.item);

  const hdlUpdate = (n) => {
      if (props.item.number + n < 0) {
          return;
      }
      props.hdlUpdate(props.item.id, n);
  };

  const hdlRemove = () => {
      props.hdlRemove(props.item.id);
  };

  return (
      <div className='counter'>
          <button onClick={() => hdlUpdate(-1)}> - </button>
          <h3>{props.item.number}</h3>
          <button onClick={() => hdlUpdate(1)}> + </button>
          <button onClick={() => hdlUpdate(-props.item.number)}> C </button>
          <button onClick={hdlRemove}> X </button>
      </div>
  )
}

function SumInfo(props) {
  const stTitle = {
      color: props.color,
      fontSize: props.size === 'big' ? '50px' : '40px'
  }
  return (
      <div className='suminfo'>
          <h1 style={{ color: props.color, fontSize: '50px' }}>Sum = {props.sum}</h1>
      </div>
  )
}

function App() {

  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }])
  const [sum, setSum] = React.useState(0);

  const hdlUpdate = (id, num) => {
      const cloneCounters = [...counters]
      let idx = cloneCounters.findIndex(el => el.id === id)
      if (cloneCounters[idx].number + num < 0) {
          return
      }
      cloneCounters[idx].number += num
      setCounters(cloneCounters);

      // Update the sum
      const newSum = cloneCounters.reduce((acc, counter) => acc + counter.number, 0);
      setSum(newSum);
  }

  const hdlAddCounter = () => {
      let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1
      const cloneCounters = [...counters]
      cloneCounters.push({ id: newId, number: 0 })
      setCounters(cloneCounters);

      // Update the sum
      const newSum = cloneCounters.reduce((acc, counter) => acc + counter.number, 0);
      setSum(newSum);
  }

  const hdlRemove = (id) => {
      const updatedCounters = counters.filter((counter) => counter.id !== id);
      setCounters(updatedCounters);

      // Update the sum
      const newSum = updatedCounters.reduce((acc, counter) => acc + counter.number, 0);
      setSum(newSum);
  };

  return (
      <> <div className="suminfo">
          <h1 className='text-center'>Codecamp Academy 01</h1>
          <button className='text-center' onClick={hdlAddCounter}>Add Counter</button>
          <SumInfo color="red" size="big" sum={sum} />

          {counters.map(el => {
              return <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlRemove={hdlRemove} />
          })}
          </div>
      </>
  )
}