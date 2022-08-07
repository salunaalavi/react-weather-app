import useTemp from "../api/hooks/useTemp";

function Temperature({ temperature }) {
  const temp = useTemp(temperature);
  return temp;
}

export default Temperature;
