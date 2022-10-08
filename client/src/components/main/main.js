import React from "react";


function Main() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/main")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="Main">
      Main Page
    </div>
  );
}

export default Main;