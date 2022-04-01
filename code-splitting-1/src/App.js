import React, { Suspense, useState } from "react";

import Header from "./Header";
//async loading component
// function loadComponent(importFunc) {
//   return class WrappedComponent extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         Component: null,
//       };
//     }

//     componmentDidMount() {
//       importFunc().then((mod) => {
//         this.setState({
//           Component: mod.default,
//         });
//       });
//     }

//     render() {
//       return this.state.Component ? (
//         <this.state.Component {...this.props} />
//       ) : null;
//     }
//   };
// }

const MyDefaultComponent = React.lazy(() => import("./MyDefaultComponent"));

function App() {
  const [names, setNames] = useState(null);

  const onLoad = async () => {
    // import("./names").then((module) => {
    //   // console.log(module);
    //   //default is list of names
    //   setNames(module.default);
    // });

    // //ANOTHER DYNAMIC IMPORT (and how to give the chunk names)
    // import("./utilities" /*  webpackChunkName: "utilities" */).then(
    //   ({ makeUpperCase }) => {
    //     setNames((names) => makeUpperCase(names));
    //   }
    // );

    //async chronous import
    const name = (await import("./names")).default;
    const makeUpperCase = (
      await import("./utilities" /*  webpackChunkName: "utilities" */)
    ).makeUpperCase;

    setNames(makeUpperCase(name));
  };

  return (
    <div>
      <Header />
      <div>Home App</div>
      <button onClick={onLoad}>Load</button>
      <div>{JSON.stringify(names)}</div>
      {names && (
        <Suspense fallback={<div>loading</div>}>
          <MyDefaultComponent />
        </Suspense>
      )}
    </div>
  );
}

export default App;
