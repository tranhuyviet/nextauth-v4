import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

interface IProviderLoginButton {
  providers: ClientSafeProvider;
  csrfToken: string;
  className?: string;
}

const ProviderLoginButton = ({
  providers,
  csrfToken,
  className,
}: IProviderLoginButton) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(providers.id);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <button
        type="submit"
        className={`border-gray-100 min-w-72 w-full py-3 px-10 shadow-md rounded-lg drop-shadow-lg tracking-wide text-base ${className}`}
      >
        <div className="flex items-center">
          <div className="relative w-9 h-9">
            <Image
              src={`/icons/provider-${providers.id}.svg`}
              alt={providers.name}
              layout="fill"
            />
          </div>
          <p className="ml-2">Login with {providers.name}</p>
        </div>
      </button>
    </form>
  );
};

export default ProviderLoginButton;
