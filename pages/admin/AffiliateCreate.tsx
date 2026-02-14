import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AffiliateForm } from './AffiliateForm';

export function AffiliateCreate() {
    return (
        <div className="space-y-6">
            <div className="flex items-center mb-6">
                <Link to="/admin/afiliados" className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Novo Afiliado</h1>
                    <p className="text-sm text-gray-500">Cadastre um novo parceiro</p>
                </div>
            </div>

            <AffiliateForm />
        </div>
    );
}
