import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButtonWithVideo from "./SubmitButtonWithVideo";
import fairyDisney from "../../assets/videos/fairyDisney.mp4";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

export default function FormCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, verifyAccount } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      try {
        await verifyAccount(verificationCode);
        toast.success("Email verificado com sucesso!");
        navigate("/");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Verificação falhou.");
      }
    } catch (error) {
      toast.error(error.message || "Verificação falhou.");
    }
  };

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length === 1) {
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findIndex((digit) => digit !== "");
      const focuxIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focuxIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm flex-col self-center text-black dark:text-white select-none"
    >
      <div className="pb-5">
        <div className="flex justify-center space-x-4">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              required
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData("text");
                const newCode = [...code];
                for (
                  let i = 0;
                  i < pastedData.length && index + i < newCode.length;
                  i++
                ) {
                  newCode[index + i] = pastedData[i];
                }
                setCode(newCode);
                const firstEmptyIndex = newCode.findIndex(
                  (digit) => digit === ""
                );
                const focusIndex =
                  firstEmptyIndex !== -1 ? firstEmptyIndex : newCode.length - 1;
                setTimeout(() => inputRefs.current[focusIndex].focus(), 0);
              }}
              className={`w-8 h-9 md:w-12 md:h-12 text-center text-2xl font-bold bg-gray-100/50 dark:bg-gray-700/50 text-black dark:text-white border-2 border-gray-600/60 rounded-lg focus:border-green-500/80 focus:outline-none`}
            />
          ))}
        </div>
        <p className="text-red-500 font-semibold mt-2 text-center">{error}</p>
        <SubmitButtonWithVideo
          text="Verificar"
          src={fairyDisney}
          className="md:mt-5 mt-5"
        />
      </div>
    </form>
  );
}
