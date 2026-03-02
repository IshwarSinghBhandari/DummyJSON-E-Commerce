import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductReview } from "@/app/types/product";



export default function ReviewCard({ review }: { review: ProductReview }) {
    return (
        <Card className="rounded-lg border">
            <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{review.reviewerName}</p>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${i < Math.floor(review.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>

                <p className="text-xs text-gray-600">
                    {new Date(review.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </CardContent>
        </Card>
    );
}
