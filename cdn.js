    window.DD_RUM && window.DD_RUM.init({
      applicationId: process.env.REACT_APP_DD_APPLICATION_ID,
      clientToken: process.env.REACT_APP_DD_CLIENT_TOKEN,
      site: 'datadoghq.com',
      service: 'ignite-karaoke',
      env: 'production',
      // Specify a version number to identify the deployed version of your application in Datadog 
      // version: '1.0.0', 
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    });