import { useState } from 'react';
import { ArrowLeft, Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { CourseCard } from './components/CourseCard';
import { Badge } from '~/components/ui/badge';

export default function App() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  
  const selectedFilters = [
    { id: 'major', label: '컴퓨터공학과', icon: '📚' },
    { id: 'grade', label: '3학년', icon: '👤' },
    { id: 'goal', label: '자격증 취득', icon: '🎯' }
  ];

  const subCategories = [
    '전체',
    '웹 개발',
    '앱 개발',
    '데이터 분석',
    'AI/머신러닝',
    '정보보안',
    '자격증 취득'
  ];

  // Mock data for courses
  const courses = [
    {
      id: '1',
      institutionName: '그린컴퓨터아트학원',
      courseName: '[스마트웹&콘텐츠개발]AI활용 프론트엔드 개발자 양성과정',
      rating: 4.5,
      reviewCount: 25,
      keywords: ['실무 프로젝트', '비전공자 추천', '강사님 꼼꼼해요'],
      reviewHighlight: '이 강의 덕분에 포트폴리오 제대로 만들었어요! 강추!',
      duration: '110일',
      hours: '880시간',
      trainingType: ['오프라인', '주중주간', 'KDT'],
      cost: '전액지원',
      isFree: true,
    },
    {
      id: '2',
      institutionName: '멀티캠퍼스',
      courseName: 'AI 활용 빅데이터분석 풀스택개발자 양성과정',
      rating: 4.8,
      reviewCount: 42,
      keywords: ['취업 연계', '최신 기술', '팀 프로젝트'],
      reviewHighlight: '현업 강사님이라 실무 노하우를 많이 배웠습니다!',
      duration: '120일',
      hours: '960시간',
      trainingType: ['오프라인', '주중주간', 'KDT'],
      cost: '전액지원',
      isFree: true,
    },
    {
      id: '3',
      institutionName: '아이티윌 평생교육원',
      courseName: '웹 풀스택 개발자 양성 부트캠프',
      rating: 4.3,
      reviewCount: 18,
      keywords: ['포트폴리오 완성', '개인 맞춤', '취업 지원'],
      reviewHighlight: '3개월 만에 실력이 확실히 늘었어요. 추천합니다!',
      duration: '90일',
      hours: '720시간',
      trainingType: ['온라인', '주중저녁'],
      cost: '345,500 원',
      isFree: false,
    },
    {
      id: '4',
      institutionName: '코리아IT아카데미',
      courseName: 'UI/UX 웹디자인 & 퍼블리싱 전문가 과정',
      rating: 4.6,
      reviewCount: 31,
      keywords: ['디자인 실무', '피그마 마스터', '협업 스킬'],
      reviewHighlight: '디자인부터 퍼블리싱까지 완벽하게 배웠습니다.',
      duration: '100일',
      hours: '800시간',
      trainingType: ['오프라인', '주중주간'],
      cost: '전액지원',
      isFree: true,
    },
    {
      id: '5',
      institutionName: '휴먼교육센터',
      courseName: '자바(Java) 기반 클라우드 백엔드 개발자',
      rating: 4.4,
      reviewCount: 22,
      keywords: ['자바 마스터', '스프링부트', '클라우드'],
      reviewHighlight: '기초부터 심화까지 체계적인 커리큘럼이 좋아요.',
      duration: '105일',
      hours: '840시간',
      trainingType: ['오프라인', '주중주간', 'KDT'],
      cost: '전액지원',
      isFree: true,
    },
    {
      id: '6',
      institutionName: '비트캠프',
      courseName: '모바일 앱 개발 실무 (React Native)',
      rating: 4.7,
      reviewCount: 28,
      keywords: ['앱 개발', '리액트 네이티브', '실무 중심'],
      reviewHighlight: '앱스토어에 제 앱을 출시할 수 있었어요!',
      duration: '80일',
      hours: '640시간',
      trainingType: ['온라인', '주말'],
      cost: '280,000 원',
      isFree: false,
    },
    {
      id: '7',
      institutionName: '이젠컴퓨터학원',
      courseName: '파이썬 데이터분석 & 머신러닝 전문가',
      rating: 4.5,
      reviewCount: 35,
      keywords: ['데이터 분석', '머신러닝', '실전 프로젝트'],
      reviewHighlight: '이론과 실습의 균형이 좋고, 취업 준비에 도움됐어요.',
      duration: '95일',
      hours: '760시간',
      trainingType: ['오프라인', '주중주간'],
      cost: '전액지원',
      isFree: true,
    },
  ];

  const sortOptions = [
    { value: 'recommended', label: '추천순' },
    { value: 'reviews', label: '후기 많은 순' },
    { value: 'rating', label: '별점 높은 순' },
    { value: 'latest', label: '최신 개강일 순' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-gray-900">컴퓨터공학과 추천 강의</h1>
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Applied Filters - Clean Chips */}
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <div
              key={filter.id}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full pl-3 pr-2 py-1.5 border border-blue-100"
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
              <button className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </header>

      {/* Sub-Category Tabs - Horizontal Scroll */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-[104px] z-10 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {subCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-white px-4 py-2.5 border-b border-gray-100 sticky top-[160px] z-10">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full max-w-[180px] h-9 bg-white border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course List */}
      <main className="flex-1 px-4 py-3 overflow-y-auto pb-20">
        <div className="space-y-3">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 shadow-lg fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            총 <span className="text-blue-600">{courses.length}개</span>의 강의
          </span>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 h-9 px-4"
          >
            필터 변경
          </Button>
        </div>
      </div>
    </div>
  );
}