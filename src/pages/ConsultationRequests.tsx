
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NewAdminLayout } from '../components/NewAdminLayout';
import { AddRequestDialog } from '../components/AddRequestDialog';
import { db, ConsultationRequest } from '../services/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Edit, Trash2, Search } from 'lucide-react';

const ConsultationRequests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    } else {
      loadRequests();
    }
  }, [user, navigate]);

  const loadRequests = async () => {
    const requestsData = await db.getConsultationRequests();
    setRequests(requestsData);
  };

  if (!user?.isAdmin) {
    return null;
  }

  const handleUpdateStatus = async (id: string, status: 'На рассмотрении' | 'Принят' | 'Отклонен') => {
    await db.updateConsultationRequestStatus(id, status);
    loadRequests();
  };

  const handleDeleteRequest = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту заявку?')) {
      await db.deleteConsultationRequest(id);
      loadRequests();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Принят':
        return <Badge className="bg-nsuem-green/20 text-nsuem-green border-nsuem-green/30">Принята</Badge>;
      case 'Отклонен':
        return <Badge className="bg-nsuem-red/20 text-nsuem-red border-nsuem-red/30">Отклонена</Badge>;
      default:
        return <Badge className="bg-nsuem-yellow/20 text-nsuem-yellow border-nsuem-yellow/30">Ожидает</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRequests = requests.filter(request =>
    request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.phone.includes(searchTerm)
  );

  return (
    <NewAdminLayout title="Заявки на консультацию">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Управление заявками на консультацию</h2>
            <p className="text-white/70">Просмотр, редактирование и управление заявками на консультацию.</p>
          </div>
          <AddRequestDialog onRequestAdded={loadRequests} />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Поиск заявок..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-nsuem-orange/50 focus:border-nsuem-orange"
            />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-nsuem-green/30 text-white bg-nsuem-green/10">
              Принято: {requests.filter(r => r.status === 'Принят').length}
            </Badge>
            <Badge variant="outline" className="border-nsuem-yellow/30 text-white bg-nsuem-yellow/10">
              Ожидает: {requests.filter(r => r.status === 'На рассмотрении').length}
            </Badge>
            <Badge variant="outline" className="border-nsuem-red/30 text-white bg-nsuem-red/10">
              Отклонено: {requests.filter(r => r.status === 'Отклонен').length}
            </Badge>
          </div>
        </div>

        <div className="bg-nsuem-gray border border-white/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 bg-white/5">
                <TableHead className="text-white font-medium px-6 py-4">ФИО</TableHead>
                <TableHead className="text-white font-medium px-6 py-4">Email</TableHead>
                <TableHead className="text-white font-medium px-6 py-4">Телефон</TableHead>
                <TableHead className="text-white font-medium px-6 py-4">Дата</TableHead>
                <TableHead className="text-white font-medium px-6 py-4">Статус</TableHead>
                <TableHead className="text-white font-medium px-6 py-4">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white px-6 py-4">{request.fullName}</TableCell>
                  <TableCell className="text-white/90 px-6 py-4">{request.email}</TableCell>
                  <TableCell className="text-white/90 px-6 py-4">{request.phone}</TableCell>
                  <TableCell className="text-white/90 px-6 py-4">{formatDate(request.date)}</TableCell>
                  <TableCell className="px-6 py-4">{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 bg-white text-nsuem-gray hover:bg-gray-700 hover:text-white"
                        title="Редактировать"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-nsuem-green/30 hover:bg-nsuem-green/10 text-nsuem-green hover:text-white"
                        onClick={() => handleUpdateStatus(request.id, 'Принят')}
                        title="Принять"
                      >
                        <CheckCircle size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-nsuem-yellow/30 hover:bg-nsuem-yellow/10 text-nsuem-yellow hover:text-white"
                        onClick={() => handleUpdateStatus(request.id, 'На рассмотрении')}
                        title="На рассмотрении"
                      >
                        <Clock size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-nsuem-red/30 hover:bg-red-300/20 text-nsuem-red hover:text-white"
                        onClick={() => handleUpdateStatus(request.id, 'Отклонен')}
                        title="Отклонить"
                      >
                        <XCircle size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-400/30 hover:bg-red-300/20 text-red-400 hover:text-white"
                        onClick={() => handleDeleteRequest(request.id)}
                        title="Удалить"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </NewAdminLayout>
  );
};

export default ConsultationRequests;
