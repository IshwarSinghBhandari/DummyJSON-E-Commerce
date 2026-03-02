import { InfoRowProps } from "@/app/types/product";

export default function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-start gap-3 py-3">
            <span className="mt-0.5 text-gray-600 shrink-0">{icon}</span>

            <div>

                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm font-medium mt-0.5">{value}</p>
            </div>
        </div>
    );
}
