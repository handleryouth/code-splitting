import loadable from "@loadable/component";

const DefComponent = loadable(() => import("./MyComponents"));
const NameComponent1 = loadable(() => import("./MyComponents"), {
  resolveComponent: (components) => components.NameComponent1,
});

const NameComponent2 = loadable(() => import("./MyComponents"), {
  resolveComponent: (components) => components.NameComponent2,
});

//another way to import using loadable
const NameComponent = loadable(() => import("./MyComponents"), {
  resolveComponent: (components, prop) =>
    components[`NameComponent${prop.index}`],
});

function App() {
  return (
    <div>
      <div>Product App</div>

      <DefComponent />
      <NameComponent1 />
      <NameComponent2 />
      {/* <NameComponent index={1} />
      <NameComponent index={2} /> */}
    </div>
  );
}

export default App;
