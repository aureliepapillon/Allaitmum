import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

// Format date for display
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  if (dateStr.includes('/')) return dateStr;
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

// Format time from ISO string
const formatTime = (isoString) => {
  if (!isoString) return '-';
  const date = new Date(isoString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

// Format duration in minutes
const formatDuration = (seconds) => {
  if (!seconds) return '-';
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
};

// Generate HTML for the PDF
const generateHTML = (data) => {
  const {
    baby,
    feedingMethod,
    feedingSessions,
    sleepSessions,
    diaperEntries,
    growthEntries,
    vaccinesDone,
    medications,
    allergies,
    teeth,
    milestones,
    dateRange,
  } = data;

  const feedingMethodLabel =
    feedingMethod === 'breast' ? 'Allaitement' :
    feedingMethod === 'bottle' ? 'Biberon' :
    feedingMethod === 'mixed' ? 'Mixte' : '-';

  // Filter data by date range if provided
  const filterByDate = (items, dateField = 'startTime') => {
    if (!dateRange) return items;
    return items.filter((item) => {
      const itemDate = item[dateField] || item.timestamp || item.date;
      if (!itemDate) return true;
      const date = itemDate.split('T')[0];
      return date >= dateRange.start && date <= dateRange.end;
    });
  };

  const filteredFeedings = filterByDate(feedingSessions);
  const filteredSleep = filterByDate(sleepSessions);
  const filteredDiapers = filterByDate(diaperEntries, 'timestamp');

  // Calculate stats
  const totalFeedings = filteredFeedings.length;
  const totalFeedingMins = Math.floor(filteredFeedings.reduce((acc, s) => acc + (s.duration || 0), 0) / 60);
  const totalSleepMins = Math.floor(filteredSleep.reduce((acc, s) => acc + (s.duration || 0), 0) / 60);
  const totalDiapers = filteredDiapers.length;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Carnet de ${baby.name}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px;
          color: #333;
          font-size: 12px;
          line-height: 1.5;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #AB7058;
        }
        .header h1 {
          color: #AB7058;
          font-size: 24px;
          margin-bottom: 5px;
        }
        .header p {
          color: #666;
          font-size: 14px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          color: #AB7058;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #EED9C4;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .info-item {
          padding: 8px 12px;
          background: #FDF8F5;
          border-radius: 8px;
        }
        .info-label {
          font-size: 10px;
          color: #888;
          text-transform: uppercase;
        }
        .info-value {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        .stats-row {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }
        .stat-box {
          flex: 1;
          padding: 12px;
          background: #FDF8F5;
          border-radius: 10px;
          text-align: center;
        }
        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #AB7058;
        }
        .stat-label {
          font-size: 10px;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #EEE;
        }
        th {
          background: #FDF8F5;
          font-weight: 600;
          color: #AB7058;
          font-size: 11px;
        }
        td {
          font-size: 11px;
        }
        .badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 500;
        }
        .badge-green { background: #E8F5E9; color: #4CAF50; }
        .badge-blue { background: #E3F2FD; color: #2196F3; }
        .badge-orange { background: #FFF3E0; color: #FF9800; }
        .badge-red { background: #FFEBEE; color: #F44336; }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #EEE;
          text-align: center;
          color: #999;
          font-size: 10px;
        }
        .allergy-severe { color: #F44336; font-weight: 600; }
        .page-break { page-break-before: always; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Carnet de santé de ${baby.name}</h1>
        <p>Généré le ${new Date().toLocaleDateString('fr-FR')}${dateRange ? ` • Période : ${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}` : ''}</p>
      </div>

      <!-- Informations générales -->
      <div class="section">
        <div class="section-title">Informations générales</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Prénom</div>
            <div class="info-value">${baby.name || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Date de naissance</div>
            <div class="info-value">${formatDate(baby.birthDate)}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Poids de naissance</div>
            <div class="info-value">${baby.birthWeight ? `${baby.birthWeight} kg` : '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Taille de naissance</div>
            <div class="info-value">${baby.birthHeight ? `${baby.birthHeight} cm` : '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Mode d'alimentation</div>
            <div class="info-value">${feedingMethodLabel}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Maman</div>
            <div class="info-value">${baby.momName || '-'}</div>
          </div>
        </div>
      </div>

      <!-- Résumé -->
      <div class="section">
        <div class="section-title">Résumé${dateRange ? ' de la période' : ' global'}</div>
        <div class="stats-row">
          <div class="stat-box">
            <div class="stat-value">${totalFeedings}</div>
            <div class="stat-label">Tétées/biberons</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${totalFeedingMins}</div>
            <div class="stat-label">Minutes d'alimentation</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${Math.floor(totalSleepMins / 60)}h${totalSleepMins % 60}</div>
            <div class="stat-label">De sommeil</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${totalDiapers}</div>
            <div class="stat-label">Couches</div>
          </div>
        </div>
      </div>

      ${allergies.length > 0 ? `
      <!-- Allergies -->
      <div class="section">
        <div class="section-title">Allergies connues</div>
        <table>
          <tr>
            <th>Allergène</th>
            <th>Sévérité</th>
            <th>Réaction</th>
            <th>Découverte</th>
          </tr>
          ${allergies.map((a) => `
            <tr>
              <td><strong>${a.name}</strong></td>
              <td><span class="badge ${a.severity === 'sévère' ? 'badge-red' : a.severity === 'modérée' ? 'badge-orange' : 'badge-green'}">${a.severity}</span></td>
              <td>${a.reaction || '-'}</td>
              <td>${formatDate(a.discoveredDate)}</td>
            </tr>
          `).join('')}
        </table>
      </div>
      ` : ''}

      ${medications.filter((m) => m.active).length > 0 ? `
      <!-- Médicaments en cours -->
      <div class="section">
        <div class="section-title">Médicaments en cours</div>
        <table>
          <tr>
            <th>Médicament</th>
            <th>Dosage</th>
            <th>Fréquence</th>
            <th>Depuis</th>
          </tr>
          ${medications.filter((m) => m.active).map((m) => `
            <tr>
              <td><strong>${m.name}</strong></td>
              <td>${m.dosage || '-'}</td>
              <td>${m.frequency || '-'}</td>
              <td>${formatDate(m.startDate)}</td>
            </tr>
          `).join('')}
        </table>
      </div>
      ` : ''}

      ${growthEntries.length > 0 ? `
      <!-- Courbe de croissance -->
      <div class="section">
        <div class="section-title">Suivi de croissance</div>
        <table>
          <tr>
            <th>Date</th>
            <th>Poids</th>
            <th>Taille</th>
            <th>Périmètre crânien</th>
          </tr>
          ${growthEntries.slice(0, 10).map((g) => `
            <tr>
              <td>${formatDate(g.date)}</td>
              <td>${g.weight ? `${g.weight} kg` : '-'}</td>
              <td>${g.height ? `${g.height} cm` : '-'}</td>
              <td>${g.headCircumference ? `${g.headCircumference} cm` : '-'}</td>
            </tr>
          `).join('')}
        </table>
      </div>
      ` : ''}

      ${vaccinesDone.length > 0 ? `
      <!-- Vaccins -->
      <div class="section">
        <div class="section-title">Vaccins effectués</div>
        <p style="color: #666;">${vaccinesDone.length} vaccin(s) enregistré(s)</p>
      </div>
      ` : ''}

      ${teeth.length > 0 ? `
      <!-- Dents -->
      <div class="section">
        <div class="section-title">Dents sorties</div>
        <p style="color: #666;">${teeth.length} dent(s) enregistrée(s)</p>
      </div>
      ` : ''}

      ${milestones.length > 0 ? `
      <!-- Étapes motrices -->
      <div class="section">
        <div class="section-title">Étapes motrices atteintes</div>
        <p style="color: #666;">${milestones.length} étape(s) validée(s)</p>
      </div>
      ` : ''}

      <div class="footer">
        <p>Document généré par Allait'mum • Application de suivi bébé</p>
        <p>Ce document est fourni à titre informatif et ne remplace pas un avis médical.</p>
      </div>
    </body>
    </html>
  `;
};

export const PDFExportService = {
  // Generate and share PDF
  async exportPDF(data) {
    try {
      const html = generateHTML(data);

      // Generate PDF
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      // Share the PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `Carnet de ${data.baby.name}`,
          UTI: 'com.adobe.pdf',
        });
        return { success: true };
      } else {
        return { success: false, error: 'Le partage n\'est pas disponible sur cet appareil' };
      }
    } catch (error) {
      console.error('PDF Export error:', error);
      return { success: false, error: error.message };
    }
  },

  // Preview PDF (opens print dialog)
  async previewPDF(data) {
    try {
      const html = generateHTML(data);
      await Print.printAsync({ html });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
