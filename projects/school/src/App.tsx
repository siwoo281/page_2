import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import logo from 'figma:asset/00615d1b59bc611665476fb4668d05fa3e99d2d2.png';

export default function App() {
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [trainingGoals, setTrainingGoals] = useState<string[]>([]);
  const [trainingMethod, setTrainingMethod] = useState('전체');
  const [trainingTime, setTrainingTime] = useState('전체');

  const universities = ['배재대학교'];
  const majors = ['컴퓨터공학과', '전자공학과', '경영학과', '디자인학과', '건축학과'];
  const grades = ['3학년', '4학년', '졸업생'];
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
      university: selectedUniversity,
      major: selectedMajor,
      grade: selectedGrade,
      goals: trainingGoals,
      method: trainingMethod,
      time: trainingTime
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-1 hover:bg-blue-50 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </button>
          <img src={logo} alt="온통청년" className="h-6" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-3 overflow-y-auto pb-20">
        <div className="space-y-3">
          {/* University and Major Selection */}
          <div className="space-y-2.5 bg-white rounded-xl p-4 shadow-md border border-blue-100">
            <div>
              <Label htmlFor="university" className="text-blue-900 mb-1.5 block">📚 학교 선택</Label>
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger id="university" className="w-full bg-blue-50/50 border-blue-200 h-11 hover:border-blue-300 transition-colors">
                  <SelectValue placeholder="대학교 선택" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map(uni => (
                    <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="major" className="text-blue-900 mb-1.5 block">🎓 전공 선택</Label>
              <Select value={selectedMajor} onValueChange={setSelectedMajor}>
                <SelectTrigger id="major" className="w-full bg-blue-50/50 border-blue-200 h-11 hover:border-blue-300 transition-colors">
                  <SelectValue placeholder="학과/전공 선택" />
                </SelectTrigger>
                <SelectContent>
                  {majors.map(major => (
                    <SelectItem key={major} value={major}>{major}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Filters Section */}
          <div className="bg-white rounded-xl p-4 space-y-3 shadow-md border border-blue-100">
            {/* Grade Selection */}
            <div>
              <Label className="text-blue-900 mb-2 block">👤 학년</Label>
              <div className="flex flex-wrap gap-2">
                {grades.map(grade => (
                  <Button
                    key={grade}
                    variant={selectedGrade === grade ? 'default' : 'outline'}
                    onClick={() => setSelectedGrade(grade)}
                    className={selectedGrade === grade 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 rounded-lg shadow-sm' 
                      : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 h-9 px-4 rounded-lg'}
                  >
                    {grade}
                  </Button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-blue-100"></div>

            {/* Training Goals */}
            <div>
              <Label className="text-blue-900 mb-2 block">🎯 훈련 목표</Label>
              <div className="grid grid-cols-2 gap-2">
                {goals.map(goal => (
                  <div key={goal.id} className="flex items-center gap-2 bg-blue-50/30 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <Checkbox
                      id={goal.id}
                      checked={trainingGoals.includes(goal.id)}
                      onCheckedChange={() => handleGoalToggle(goal.id)}
                      className="w-5 h-5 border-blue-300"
                    />
                    <Label
                      htmlFor={goal.id}
                      className="text-blue-900 cursor-pointer flex-1"
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
              <Label className="text-blue-900 mb-2 block">💻 훈련 방식</Label>
              <div className="flex flex-wrap gap-2">
                {methods.map(method => (
                  <Button
                    key={method}
                    variant={trainingMethod === method ? 'default' : 'outline'}
                    onClick={() => setTrainingMethod(method)}
                    className={trainingMethod === method 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 rounded-lg shadow-sm' 
                      : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 h-9 px-4 rounded-lg'}
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
              <Label className="text-blue-900 mb-2 block">⏰ 훈련 시간</Label>
              <div className="flex flex-wrap gap-2">
                {times.map(time => (
                  <Button
                    key={time}
                    variant={trainingTime === time ? 'default' : 'outline'}
                    onClick={() => setTrainingTime(time)}
                    className={trainingTime === time 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 rounded-lg shadow-sm' 
                      : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 h-9 px-4 rounded-lg'}
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
      <div className="bg-white border-t border-blue-200 px-4 py-3 shadow-2xl fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <Button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 rounded-xl shadow-lg"
        >
          🔍 맞춤 강의 찾기
        </Button>
      </div>
    </div>
  );
}