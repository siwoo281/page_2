import { useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';

interface CourseCardProps {
  id: string;
  institutionName: string;
  courseName: string;
  rating: number;
  reviewCount: number;
  keywords: string[];
  duration: string;
  hours: string;
  trainingType: string[];
  cost: string;
  isFree: boolean;
}

export function CourseCard({
  institutionName,
  courseName,
  rating,
  reviewCount,
  keywords,
  duration,
  hours,
  trainingType,
  cost,
  isFree,
}: CourseCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half">✨</span>);
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200 hover:shadow-md transition-all relative">
      {/* Favorite Button */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Heart
          className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      {/* Institution Name */}
      <div className="text-gray-500 mb-1">
        {institutionName}
      </div>

      {/* Course Name */}
      <h3 className="text-gray-900 mb-2.5 pr-6 line-clamp-2">
        {courseName}
      </h3>

      {/* Rating and Keywords */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-0.5">
          {renderStars(rating)}
        </div>
        <span className="text-gray-900">{rating.toFixed(1)}</span>
        <span className="text-gray-500">({reviewCount})</span>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {keywords.slice(0, 3).map((keyword, index) => (
          <span
            key={index}
            className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100"
          >
            #{keyword}
          </span>
        ))}
      </div>

      {/* Duration and Training Type */}
      <div className="flex items-center gap-2 mb-2 text-gray-600">
        <span>📅 {duration} · {hours}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {trainingType.map((type, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0"
          >
            {type}
          </Badge>
        ))}
      </div>

      {/* Cost and Action Button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className={`${isFree ? 'text-blue-600' : 'text-gray-900'}`}>
          {isFree ? '💰 전액지원' : `💰 ${cost}`}
        </span>
        <button className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors flex items-center gap-1">
          상세보기
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}