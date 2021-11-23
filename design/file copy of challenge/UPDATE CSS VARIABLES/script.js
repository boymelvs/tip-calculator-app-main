const inputs = document.querySelectorAll(".controls input");

const handleUpdate = (e) => {
  const name = e.target.name;

  document.documentElement.style.setProperty(
    `--${name}`,
    name === "base" ? e.target.value : `${e.target.value}px`
  );
};

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
