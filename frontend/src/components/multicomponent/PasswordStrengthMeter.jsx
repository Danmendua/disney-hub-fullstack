import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "Conter no mínimo 6 caractéres", met: password.length >= 6 },
    { label: "Conter uma letra maíuscula", met: /[A-Z]/.test(password) },
    { label: "Conter uma letra minúscula", met: /[a-z]/.test(password) },
    { label: "Conter um número", met: /\d/.test(password) },
    {
      label: "Conter um caractere especial",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs font-medium">
          {item.met ? (
            <IoCheckmarkSharp className="size-4 text-green-500 mr-2" />
          ) : (
            <IoCloseSharp className="size-4 text-gray-500 mr-2" />
          )}
          <span
            className={
              item.met
                ? "text-black dark:text-white"
                : "text-gray-600 dark:text-gray-400"
            }
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Muito fraca";
    if (strength === 1) return "Ainda falta um pouco!";
    if (strength === 2) return "Mais um pouco!";
    if (strength === 3) return "Está quase lá!";
    return "Agora sim!";
  };

  return (
    <div className="mt-8 md:-mb-10 -mb-5">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Parâmetros da Senha
        </span>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                ${index < strength ? getColor(strength) : "bg-gray-600"}
              `}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};
export default PasswordStrengthMeter;
