import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

export default function App() {
  const navigate = useNavigate();
  const [selectedJobField, setSelectedJobField] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [trainingGoals, setTrainingGoals] = useState<string[]>([]);
  const [trainingMethod, setTrainingMethod] = useState('전체');
  const [trainingTime, setTrainingTime] = useState('전체');

  const jobFields = [
    { id: 'it', label: 'IT/개발', icon: '💻' },
    { id: 'design', label: '디자인', icon: '🎨' },
    { id: 'marketing', label: '마케팅/홍보', icon: '📢' },
    { id: 'admin', label: '사무/행정', icon: '📄' },
    { id: 'sales', label: '영업/판매', icon: '💼' },
    { id: 'service', label: '서비스/고객지원', icon: '🤝' },
    { id: 'production', label: '생산/제조', icon: '⚙️' },
    { id: 'finance', label: '금융/회계', icon: '💰' },
    { id: 'education', label: '교육/강사', icon: '📚' },
    { id: 'media', label: '미디어/콘텐츠', icon: '🎬' }
  ];

  const goals = [
    { id: 'certificate', label: '자격증 취득' },
    { id: 'practical', label: '실무 역량 향상' },
    { id: 'portfolio', label: '포트폴리오 제작' },
    { id: 'employment', label: '취업/이직 준비' }
  ];
  const methods = ['전체', '오프라인(집체)', '온라인(원격)'];
  const times = ['전체', '주중 저녁', '주말', '방학 단기'];

  const handleGoalToggle = (goalId: string) => {
    setTrainingGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleSearch = () => {
    console.log({
      jobField: selectedJobField,
      keyword: searchKeyword,
      goals: trainingGoals,
      method: trainingMethod,
      time: trainingTime
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50/30 to-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm border-b border-blue-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-5 overflow-y-auto pb-20">
        <div className="space-y-4">
          {/* Job Field Selection - Step 1 */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-blue-100/50">
            <Label className="text-blue-900 mb-4 block text-lg">🎯 관심 직무 분야를 선택하세요 </Label>
            <div className="grid grid-cols-2 gap-2">
              {jobFields.map(field => (
                <Button
                  key={field.id}
                  variant={selectedJobField === field.id ? 'default' : 'outline'}
                  onClick={() => setSelectedJobField(field.id)}
                  className={selectedJobField === field.id 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-11 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all' 
                    : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 h-11 rounded-xl flex items-center justify-center gap-2 transition-all'}
                >
                  <span className="text-lg">{field.icon}</span>
                  <span className="text-sm">{field.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Keyword Search - Step 2 */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-blue-100/50">
            <Label htmlFor="keyword-search" className="text-blue-900 mb-3 block text-lg">🔍 세부 직무 또는 키워드를 입력하세요 (선택)</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
              <Input
                id="keyword-search"
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="예) 웹 퍼블리셔, 파이썬, 영상 편집, 컴활 1급"
                className="pl-10 bg-blue-50/50 border-blue-200 h-12 hover:border-blue-400 focus:border-blue-500 transition-colors rounded-xl"
              />
            </div>
          </div>

          {/* Additional Filters - Step 3 */}
          <div className="bg-white rounded-2xl p-5 space-y-4 shadow-md border border-blue-100/50">
            <Label className="text-blue-900 block text-lg">⚙️ 추가 필터 (선택)</Label>
            
            {/* Divider */}
            <div className="border-t border-blue-100"></div>

            {/* Training Goals */}
            <div>
              <Label className="text-blue-900 mb-3 block">🎯 훈련 목표</Label>
              <div className="grid grid-cols-2 gap-2">
                {goals.map(goal => (
                  <div key={goal.id} className="flex items-center gap-2.5 bg-blue-50/40 p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all cursor-pointer">
                    <Checkbox
                      id={goal.id}
                      checked={trainingGoals.includes(goal.id)}
                      onCheckedChange={() => handleGoalToggle(goal.id)}
                      className="w-5 h-5 border-blue-300"
                    />
                    <Label
                      htmlFor={goal.id}
                      className="text-blue-900 cursor-pointer flex-1 text-base"
                    >
                      {goal.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-blue-100"></div>

            {/* Training Method */}
            <div>
              <Label className="text-blue-900 mb-3 block">💻 훈련 방식</Label>
              <div className="flex flex-wrap gap-2">
                {methods.map(method => (
                  <Button
                    key={method}
                    variant={trainingMethod === method ? 'default' : 'outline'}
                    onClick={() => setTrainingMethod(method)}
                    className={trainingMethod === method 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-10 px-5 rounded-xl shadow-sm transition-all' 
                      : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 h-10 px-5 rounded-xl transition-all'}
                  >
                    {method}
                  </Button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-blue-100"></div>

            {/* Training Time */}
            <div>
              <Label className="text-blue-900 mb-3 block">⏰ 훈련 시간</Label>
              <div className="flex flex-wrap gap-2">
                {times.map(time => (
                  <Button
                    key={time}
                    variant={trainingTime === time ? 'default' : 'outline'}
                    onClick={() => setTrainingTime(time)}
                    className={trainingTime === time 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-10 px-5 rounded-xl shadow-sm transition-all' 
                      : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 h-10 px-5 rounded-xl transition-all'}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="bg-white border-t border-blue-200 px-4 py-4 shadow-2xl fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <Button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Search className="w-5 h-5 mr-2" />
          맞춤 강의 찾기
        </Button>
      </div>
    </div>
  );
}