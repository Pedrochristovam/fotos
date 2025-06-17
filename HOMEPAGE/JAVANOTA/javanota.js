
        // Função para buscar localização (aqui você integrará com a API do Google)
        function searchLocation() {
            const searchTerm = document.getElementById('searchLocation').value;
            if (!searchTerm.trim()) {
                alert('Por favor, digite um endereço para buscar.');
                return;
            }

            // Aqui você fará a integração com a API do Google Maps
            // Por enquanto, simulando um resultado completo
            const mockResult = `${searchTerm} - Endereço Encontrado`;
            document.getElementById('foundAddress').textContent = mockResult;
            
            // Simulando coordenadas e detalhes (substitua pela resposta real da API)
            document.getElementById('latitude').value = '-19.9167';
            document.getElementById('longitude').value = '-43.9345';
            document.getElementById('cep').value = '30112-000';
            document.getElementById('bairro').value = 'Centro';
            
            console.log('Buscando localização para:', searchTerm);
            // TODO: Integrar com Google Maps API
        }

        // Função para capturar a localização selecionada
        function captureLocation() {
            const address = document.getElementById('foundAddress').textContent;
            if (address && address !== 'Resultado da busca aparecerá aqui...') {
                document.getElementById('endereco').value = address;
                alert('Localização capturada com sucesso!');
            } else {
                alert('Realize uma busca primeiro para capturar a localização.');
            }
        }

        // Função para limpar a busca
        function clearLocation() {
            document.getElementById('searchLocation').value = '';
            document.getElementById('foundAddress').textContent = 'Resultado da busca aparecerá aqui...';
            document.getElementById('latitude').value = '';
            document.getElementById('longitude').value = '';
            document.getElementById('cep').value = '';
            document.getElementById('bairro').value = '';
        }

        // Função para ver no mapa (integração futura)
        function viewOnMap() {
            const lat = document.getElementById('latitude').value;
            const lng = document.getElementById('longitude').value;
            
            if (lat && lng) {
                // Aqui você pode abrir o Google Maps ou outro serviço
                const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(mapsUrl, '_blank');
            } else {
                alert('Realize uma busca primeiro para visualizar no mapa.');
            }
        }

        // Função para gerar PDF
        function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Configurações iniciais
            let yPosition = 20;
            const leftMargin = 20;
            const rightMargin = 190;
            const lineHeight = 7;
            
            // Função para adicionar texto com quebra de linha
            function addText(text, x, y, options = {}) {
                const fontSize = options.fontSize || 10;
                const fontStyle = options.fontStyle || 'normal';
                const maxWidth = options.maxWidth || (rightMargin - x);
                
                doc.setFontSize(fontSize);
                doc.setFont('helvetica', fontStyle);
                
                if (text && text.toString().length > 0) {
                    const splitText = doc.splitTextToSize(text.toString(), maxWidth);
                    doc.text(splitText, x, y);
                    return y + (splitText.length * lineHeight);
                }
                return y + lineHeight;
            }
            
            // Função para adicionar nova página se necessário
            function checkNewPage(requiredSpace = 20) {
                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 20;
                }
            }
            
            // Título do documento
            doc.setFillColor(52, 152, 219);
            doc.rect(0, 0, 210, 30, 'F');
            doc.setTextColor(255, 255, 255);
            yPosition = addText('RELATÓRIO DE VISTORIA DE IMÓVEL', leftMargin, 15, {fontSize: 18, fontStyle: 'bold'});
            yPosition = addText('Sistema de Avaliação e Controle', leftMargin, yPosition - 3, {fontSize: 12});
            
            // Reset cor do texto
            doc.setTextColor(0, 0, 0);
            yPosition = 45;
            
            // Coletando dados do formulário
            const formData = {
                notaTecnica: document.getElementById('notaTecnica').value,
                numeroProcesso: document.getElementById('numeroProcesso').value,
                municipio: document.getElementById('municipio').value,
                codigoImovel: document.getElementById('codigoImovel').value,
                dadosCartoriais: document.getElementById('dadosCartoriais').value,
                dataVisita: document.getElementById('dataVisita').value,
                avaliacao: document.getElementById('avaliacao').value,
                endereco: document.getElementById('endereco').value,
                tipoUso: document.getElementById('tipoUso').value,
                situacao: document.getElementById('situacao').value,
                latitude: document.getElementById('latitude').value,
                longitude: document.getElementById('longitude').value,
                cep: document.getElementById('cep').value,
                bairro: document.getElementById('bairro').value,
                descricaoImovel: document.getElementById('descricaoImovel').value,
                vistoriaRelatorio: document.getElementById('vistoriaRelatorio').value,
                regularizacao: document.getElementById('regularizacao').value,
                conclusao: document.getElementById('conclusao').value,
                fotos: document.getElementById('fotos').value,
                responsavelVistoria: document.getElementById('responsavelVistoria').value,
                responsavelQualidade: document.getElementById('responsavelQualidade').value
            };
            
            // Seção: Informações Básicas
            checkNewPage();
            yPosition = addText('INFORMAÇÕES BÁSICAS', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
            yPosition += 5;
            
            if (formData.numeroProcesso) {
                yPosition = addText(`Número do Processo: ${formData.numeroProcesso}`, leftMargin, yPosition, {fontStyle: 'bold'});
            }
            
            if (formData.notaTecnica) {
                yPosition = addText('Nota Técnica:', leftMargin, yPosition, {fontStyle: 'bold'});
                yPosition = addText(formData.notaTecnica, leftMargin, yPosition);
                yPosition += 3;
            }
            
            // Seção: Dados do Imóvel
            checkNewPage();
            yPosition = addText('DADOS DO IMÓVEL', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
            yPosition += 5;
            
            const dadosImovel = [
                {label: 'Município', value: formData.municipio},
                {label: 'Código do Imóvel', value: formData.codigoImovel},
                {label: 'Dados Cartoriais', value: formData.dadosCartoriais},
                {label: 'Data da Visita', value: formData.dataVisita},
                {label: 'Avaliação', value: formData.avaliacao},
                {label: 'Endereço', value: formData.endereco},
                {label: 'Tipo de Uso', value: formData.tipoUso},
                {label: 'Situação', value: formData.situacao}
            ];
            
            dadosImovel.forEach(item => {
                if (item.value) {
                    yPosition = addText(`${item.label}: ${item.value}`, leftMargin, yPosition);
                }
            });
            
            // Seção: Localização
            if (formData.latitude || formData.longitude || formData.cep || formData.bairro) {
                checkNewPage();
                yPosition += 5;
                yPosition = addText('DADOS DE LOCALIZAÇÃO', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
                yPosition += 5;
                
                if (formData.latitude) yPosition = addText(`Latitude: ${formData.latitude}`, leftMargin, yPosition);
                if (formData.longitude) yPosition = addText(`Longitude: ${formData.longitude}`, leftMargin, yPosition);
                if (formData.cep) yPosition = addText(`CEP: ${formData.cep}`, leftMargin, yPosition);
                if (formData.bairro) yPosition = addText(`Bairro: ${formData.bairro}`, leftMargin, yPosition);
            }
            
            // Seção: Descrição do Imóvel
            if (formData.descricaoImovel) {
                checkNewPage();
                yPosition += 5;
                yPosition = addText('DESCRIÇÃO DO IMÓVEL', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
                yPosition += 5;
                yPosition = addText(formData.descricaoImovel, leftMargin, yPosition);
            }
            
            // Seção: Vistoria e Relatório
            if (formData.vistoriaRelatorio) {
                checkNewPage();
                yPosition += 5;
                yPosition = addText('VISTORIA E RELATÓRIO', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
                yPosition += 5;
                yPosition = addText(formData.vistoriaRelatorio, leftMargin, yPosition);
            }
            
            // Seção: Regularização
            if (formData.regularizacao) {
                checkNewPage();
                yPosition += 5;
                yPosition = addText('REGULARIZAÇÃO', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
                yPosition += 5;
                yPosition = addText(formData.regularizacao, leftMargin, yPosition);
            }
            
            // Seção: Conclusão
            if (formData.conclusao) {
                checkNewPage();
                yPosition += 5;
                yPosition = addText('CONCLUSÃO', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
                yPosition += 5;
                yPosition = addText(formData.conclusao, leftMargin, yPosition);
            }
            
            // Seção: Fotos
            if (formData.fotos) {
                checkNewPage();
                yPosition += 5;
                yPosition = addText('FOTOS', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
                yPosition += 5;
                yPosition = addText(formData.fotos, leftMargin, yPosition);
            }
            
            // Seção: Responsáveis
            if (formData.responsavelVistoria || formData.responsavelQualidade) {
                checkNewPage();
                yPosition += 10;
                yPosition = addText('RESPONSÁVEIS', leftMargin, yPosition, {fontSize: 14, fontStyle: 'bold'});
                yPosition += 5;
                
                if (formData.responsavelVistoria) {
                    yPosition = addText(`Responsável pela Vistoria: ${formData.responsavelVistoria}`, leftMargin, yPosition, {fontStyle: 'bold'});
                }
                if (formData.responsavelQualidade) {
                    yPosition = addText(`Responsável pelo Controle de Qualidade: ${formData.responsavelQualidade}`, leftMargin, yPosition, {fontStyle: 'bold'});
                }
            }
            
            // Rodapé
            const totalPages = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Página ${i} de ${totalPages}`, rightMargin - 30, 290);
                doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, leftMargin, 290);
            }
            
            // Salvar o PDF
            const nomeArquivo = formData.numeroProcesso ? 
                `Vistoria_${formData.numeroProcesso.replace(/[^a-zA-Z0-9]/g, '_')}.pdf` : 
                `Vistoria_${new Date().toISOString().slice(0, 10)}.pdf`;
                
            doc.save(nomeArquivo);
            
            console.log('PDF gerado com sucesso:', formData);
        }

        // Permitir busca ao pressionar Enter
        document.getElementById('searchLocation').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchLocation();
            }
        });
   