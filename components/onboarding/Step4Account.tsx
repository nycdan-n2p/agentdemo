"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step4AccountProps {
  formData: {
    fullName: string;
    email: string;
    companyWebsite: string;
    sendSms: boolean;
    phone: string;
  };
  onFormChange: (data: Step4AccountProps["formData"]) => void;
  onBack: () => void;
  onSubmit: () => void;
}

type VerifyState = "idle" | "sending" | "code-sent" | "verifying" | "verified";

export function Step4Account({
  formData,
  onFormChange,
  onBack,
  onSubmit,
}: Step4AccountProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailVerifyState, setEmailVerifyState] = useState<VerifyState>("idle");
  const [phoneVerifyState, setPhoneVerifyState] = useState<VerifyState>("idle");
  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const [phoneCode, setPhoneCode] = useState(["", "", "", "", "", ""]);
  const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phoneInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const phoneValid = /^\+?\d[\d\s\-()]{7,}$/.test(formData.phone.trim());

  const handleSendEmailCode = () => {
    if (!emailValid) {
      setErrors((e) => ({ ...e, email: "Enter a valid email address" }));
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.email;
      return next;
    });
    setEmailVerifyState("sending");
    setTimeout(() => {
      setEmailVerifyState("code-sent");
      setTimeout(() => emailInputRefs.current[0]?.focus(), 100);
    }, 1500);
  };

  const handleSendPhoneCode = () => {
    if (!phoneValid) {
      setErrors((e) => ({ ...e, phone: "Enter a valid phone number" }));
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.phone;
      return next;
    });
    setPhoneVerifyState("sending");
    setTimeout(() => {
      setPhoneVerifyState("code-sent");
      setTimeout(() => phoneInputRefs.current[0]?.focus(), 100);
    }, 1500);
  };

  const handleEmailCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...emailCode];
    next[index] = value;
    setEmailCode(next);
    if (value && index < 5) emailInputRefs.current[index + 1]?.focus();
  };
  const handleEmailCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !emailCode[index] && index > 0) {
      emailInputRefs.current[index - 1]?.focus();
    }
  };
  const handleEmailCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...emailCode];
    for (let i = 0; i < 6; i++) next[i] = pasted[i] || "";
    setEmailCode(next);
    const focusIdx = Math.min(pasted.length, 5);
    emailInputRefs.current[focusIdx]?.focus();
  };

  const handlePhoneCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...phoneCode];
    next[index] = value;
    setPhoneCode(next);
    if (value && index < 5) phoneInputRefs.current[index + 1]?.focus();
  };
  const handlePhoneCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !phoneCode[index] && index > 0) {
      phoneInputRefs.current[index - 1]?.focus();
    }
  };
  const handlePhoneCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...phoneCode];
    for (let i = 0; i < 6; i++) next[i] = pasted[i] || "";
    setPhoneCode(next);
    const focusIdx = Math.min(pasted.length, 5);
    phoneInputRefs.current[focusIdx]?.focus();
  };

  useEffect(() => {
    const full = emailCode.join("");
    if (full.length === 6 && emailVerifyState === "code-sent") {
      setEmailVerifyState("verifying");
      setTimeout(() => setEmailVerifyState("verified"), 1200);
    }
  }, [emailCode, emailVerifyState]);

  useEffect(() => {
    const full = phoneCode.join("");
    if (full.length === 6 && phoneVerifyState === "code-sent") {
      setPhoneVerifyState("verifying");
      setTimeout(() => setPhoneVerifyState("verified"), 1200);
    }
  }, [phoneCode, phoneVerifyState]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailValid) newErrors.email = "Invalid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneValid) newErrors.phone = "Enter a valid phone number";
    if (emailVerifyState !== "verified") newErrors.emailVerify = "Please verify your email";
    if (phoneVerifyState !== "verified") newErrors.phoneVerify = "Please verify your phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Almost there — save your agent
        </h2>
        <p className="mt-2 text-muted-foreground">
          Create your free account to get your agent live with a real phone number
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Full name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              onFormChange({ ...formData, fullName: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl bg-[#EFEFEF] border border-[#EFEFEF] text-foreground placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="John Smith"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Work email
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                onFormChange({ ...formData, email: e.target.value });
                if (emailVerifyState === "verified") {
                  setEmailVerifyState("idle");
                  setEmailCode(["", "", "", "", "", ""]);
                }
              }}
              disabled={emailVerifyState === "verified"}
              className="flex-1 px-4 py-3 rounded-xl bg-[#EFEFEF] border border-[#EFEFEF] text-foreground placeholder-gray-500 focus:outline-none focus:border-primary disabled:opacity-60"
              placeholder="john@company.com"
            />
            {emailVerifyState === "verified" ? (
              <span className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium whitespace-nowrap">
                ✓ Verified
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSendEmailCode}
                disabled={emailVerifyState === "sending" || emailVerifyState === "code-sent" || emailVerifyState === "verifying"}
                className="px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium whitespace-nowrap disabled:opacity-60"
              >
                {emailVerifyState === "sending" ? "Sending..." : emailVerifyState === "code-sent" || emailVerifyState === "verifying" ? "Code sent" : "Send code"}
              </button>
            )}
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
          <AnimatePresence>
            {(emailVerifyState === "code-sent" || emailVerifyState === "verifying") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  <p className="text-sm text-foreground">
                    Enter the 6-digit code sent to{" "}
                    <span className="font-medium">{formData.email}</span>
                  </p>
                  <div className="flex gap-2" onPaste={handleEmailCodePaste}>
                    {emailCode.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { emailInputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleEmailCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleEmailCodeKeyDown(i, e)}
                        className="w-11 h-12 text-center text-lg font-mono font-bold rounded-xl bg-[#EFEFEF] border border-[#EFEFEF] text-foreground focus:outline-none focus:border-primary"
                      />
                    ))}
                  </div>
                  {emailVerifyState === "verifying" && (
                    <p className="text-xs text-muted-foreground">Verifying...</p>
                  )}
                  <button
                    type="button"
                    onClick={handleSendEmailCode}
                    className="text-xs text-primary hover:underline"
                  >
                    Resend code
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {errors.emailVerify && emailVerifyState !== "verified" && (
            <p className="text-sm text-red-500">{errors.emailVerify}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Company website{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            type="url"
            value={formData.companyWebsite}
            onChange={(e) =>
              onFormChange({ ...formData, companyWebsite: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl bg-[#EFEFEF] border border-[#EFEFEF] text-foreground placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="https://company.com"
          />
          <p className="mt-1.5 text-sm text-muted-foreground px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
            <span className="font-medium text-foreground">Smarter agent:</span> Add your site and we&apos;ll read it to train your agent — so it knows your business, products, and how to talk to your customers
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Phone number
          </label>
          <p className="text-xs text-muted-foreground -mt-1 mb-2">
            We need your number so the agent can call you
          </p>
          <div className="flex gap-2">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                onFormChange({ ...formData, phone: e.target.value });
                if (phoneVerifyState === "verified") {
                  setPhoneVerifyState("idle");
                  setPhoneCode(["", "", "", "", "", ""]);
                }
              }}
              disabled={phoneVerifyState === "verified"}
              className="flex-1 px-4 py-3 rounded-xl bg-[#EFEFEF] border border-[#EFEFEF] text-foreground placeholder-gray-500 focus:outline-none focus:border-primary disabled:opacity-60"
              placeholder="+1 (555) 123-4567"
            />
            {phoneVerifyState === "verified" ? (
              <span className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium whitespace-nowrap">
                ✓ Verified
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSendPhoneCode}
                disabled={phoneVerifyState === "sending" || phoneVerifyState === "code-sent" || phoneVerifyState === "verifying"}
                className="px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium whitespace-nowrap disabled:opacity-60"
              >
                {phoneVerifyState === "sending" ? "Sending..." : phoneVerifyState === "code-sent" || phoneVerifyState === "verifying" ? "Code sent" : "Send code"}
              </button>
            )}
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}

          <AnimatePresence>
            {(phoneVerifyState === "code-sent" || phoneVerifyState === "verifying") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  <p className="text-sm text-foreground">
                    Enter the 6-digit code sent to{" "}
                    <span className="font-medium">{formData.phone}</span>
                  </p>
                  <div className="flex gap-2" onPaste={handlePhoneCodePaste}>
                    {phoneCode.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { phoneInputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePhoneCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handlePhoneCodeKeyDown(i, e)}
                        className="w-11 h-12 text-center text-lg font-mono font-bold rounded-xl bg-[#EFEFEF] border border-[#EFEFEF] text-foreground focus:outline-none focus:border-primary"
                      />
                    ))}
                  </div>
                  {phoneVerifyState === "verifying" && (
                    <p className="text-xs text-muted-foreground">Verifying...</p>
                  )}
                  <button
                    type="button"
                    onClick={handleSendPhoneCode}
                    className="text-xs text-primary hover:underline"
                  >
                    Resend code
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {errors.phoneVerify && phoneVerifyState !== "verified" && (
            <p className="text-sm text-red-500">{errors.phoneVerify}</p>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required. Your agent gets a real phone number instantly
        </p>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg"
        >
          Create My Agent →
        </button>

        <p className="text-xs text-muted-foreground text-center">
          By continuing you agree to our Terms and Privacy Policy
        </p>
      </form>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[#EFEFEF] text-muted-foreground hover:bg-[#EFEFEF] hover:text-foreground font-medium"
        >
          ← Back
        </button>
      </div>
    </motion.div>
  );
}
