import React, { memo } from "react";

interface InputProps {
  htmlFor?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  errorText?: string;
  readOnly?: boolean;
  value?: string;
}

function Input({
  htmlFor = undefined,
  type = undefined,
  placeholder = undefined,
  onChange = undefined,
  errorText = undefined,
  readOnly = false,
  value = undefined,
}: InputProps) {
  return (
    <div className="flex flex-col w-full relative">
      <div className="flex items-center">
        <input
          type={type}
          readOnly={readOnly}
          value={value}
          id={htmlFor}
          className={`py-3 px-4 pl-12 block text-lg text-font w-full bg-input-bg border-border bg-bg font-light rounded-xl focus:border-primary focus:outline-none active:border-primary placeholder:text-font placeholder:font-light placeholder:text-base border ${errorText ? "bg-fade-error border-primary-red border text-primary-red focus:border-2 focus:border-primary-red placeholder:text-primary-red" : ""}`}
          placeholder={placeholder}
          onChange={onChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          id="search"
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-font"
        >
          <path
            fill="currentColor"
            d="M19.7555474,18.6065254 L16.3181544,15.2458256 L16.3181544,15.2458256 L16.2375905,15.1233001 C16.0877892,14.9741632 15.8829641,14.8901502 15.6691675,14.8901502 C15.4553709,14.8901502 15.2505458,14.9741632 15.1007444,15.1233001 L15.1007444,15.1233001 C12.1794834,17.8033337 7.6781476,17.94901 4.58200492,15.4637171 C1.48586224,12.9784243 0.75566836,8.63336673 2.87568494,5.31016931 C4.99570152,1.9869719 9.30807195,0.716847023 12.9528494,2.34213643 C16.5976268,3.96742583 18.4438102,7.98379036 17.2670181,11.7275931 C17.182269,11.9980548 17.25154,12.2921761 17.4487374,12.4991642 C17.6459348,12.7061524 17.9410995,12.794561 18.223046,12.7310875 C18.5049924,12.667614 18.7308862,12.4619014 18.8156353,12.1914397 L18.8156353,12.1914397 C20.2223941,7.74864367 18.0977423,2.96755391 13.8161172,0.941057725 C9.53449216,-1.08543846 4.38083811,0.250823958 1.68905427,4.08541671 C-1.00272957,7.92000947 -0.424820906,13.1021457 3.0489311,16.2795011 C6.5226831,19.4568565 11.8497823,19.6758854 15.5841278,16.7948982 L18.6276529,19.7705177 C18.9419864,20.0764941 19.4501654,20.0764941 19.764499,19.7705177 C20.0785003,19.4602048 20.0785003,18.9605974 19.764499,18.6502845 L19.764499,18.6502845 L19.7555474,18.6065254 Z"
            transform="translate(2 2)"
          />
        </svg>
      </div>
      {errorText ? (
        <p className="mt-2 text-sm text-primary-red">{errorText}</p>
      ) : (
        <div />
      )}
    </div>
  );
}

export default memo(Input);
