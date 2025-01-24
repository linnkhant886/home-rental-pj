import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export type ActionFunction = (
  prevState: { message: string; error: string; redirectUrl?: string }, // Define the shape of prevState
  formData: FormData
) => Promise<{ message: string; error: string; redirectUrl?: string }>; // Define the return type

const initialState = {
  message: "",
  error: "",
  redirectUrl: "",
};

export default function FormContainer({
  action,
  children,
}: {
  action: ActionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message, variant: 'default' }); // Show success toast
    }
    if (state.error) {
      toast({ description: state.error, variant: 'destructive' }); // Show error toast
    }
    if (state.redirectUrl) {
      router.push(state.redirectUrl); // Redirect to the specified URL
    }
  }, [state]);
  
  return <form action={formAction}>{children}</form>;
}
