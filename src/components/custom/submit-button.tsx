import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

const SubmitButton = ({ defaultText, loadingText, pending }: { defaultText: string, loadingText: string, pending: boolean }) => {
    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
                <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    <span>{loadingText}</span>
                </div>
            ) : (
                <p>
                    {defaultText}
                </p>
            )}
        </Button>
    );
};
export default SubmitButton