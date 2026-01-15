import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = ({ stripeData, onSuccess }) => (
  <Elements
    stripe={stripePromise}
    options={{
      clientSecret: stripeData.clientSecret,
      appearance: { theme: "stripe" },
    }}
  >
    <StripeForm onSuccess={onSuccess} />
  </Elements>
);

const StripeForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);

  const pay = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe not ready");
      return;
    }

    setPaying(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    setPaying(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await onSuccess();
    }
  };

  return (
    <div className="mt-6">
      <PaymentElement />
      <button
        onClick={pay}
        disabled={paying || !stripe}
        className="mt-4 w-full bg-black text-white py-3 rounded-lg"
      >
        {paying ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default StripePayment;
