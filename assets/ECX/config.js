var Config = {
    cmsRootPath: '',
    // demo site : https://demos.eccentex.com/BDS.WebService/DataServiceRest.svc/post/DCM_Playground_Production.tenant1/root_DCM_SearchCasesACAll
    // site url  https://trydcm.eccentex.com/Ecx.Web?appid=ROOT_CASEMANAGEMENT&d=DCM_TRAINING_PRODUCTION.TENANT82
   //site url  https://sandbox.eccentex.com/Ecx.Web?appid=root_CaseManagement&d=DCM_Production.tenant12&t=
   siteUrl: 'https://sandbox.eccentex.com/',
   // ARIMR (NOT POC) appBaseDomain: 'DCM_PRODUCTION.TENANT12',
   appBaseDomain: 'DCM2.TENANT12',
   //Config.TOKEN_SYSTEMDOMAIN
   appBaseTokenSystemDomain: 'config.tenant12',
    // siteUrl:   'https://trydcm.eccentex.com/',
    // // from url d={#}
    // appBaseDomain: 'DCM_PRODUCTION.TENANT82',
    // // Config.TOKEN_SYSTEMDOMAIN
    // appBaseTokenSystemDomain: 'config.tenant82',
//  Rules
    caseCreateRule     : 'root_MDM_CreateCaseWithDataFn',
    caseGetTypesRule   : 'root_STP_getCaseTypes',
    caseSearchRule     : 'root_DCM_SearchCases',
    extPartySearchRule : 'ROOT_CUST_GETEXTPARTYDATA',
//  Functions 
//  This function returns params for open case detail page
    getCaseDetailPageParams: function() {
        return 'app=CaseDetailRuntime&group=FOM&usePageConfig=1&appid=root_CaseManagement';
        //return 'app=PortalCaseDetailRuntime&group=FOM&usePageConfig=1&appid=root_Portal';
    },

    getCMSServiceRestUrl: function(uri) {
        return this.siteUrl + 'CMS.WebService/CMSServiceRest.svc/' + uri;
    },

    getFileNameToUpload: function(fname) {
        if (fname) {
            var now = new Date(),
                reg = /(.*?)(\.[^.]*)?$/,
                date = now.getFullYear() + '' + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds();
            // date = moment(new Date()).tz(moment.tz.guess()).format('YYYYMMDDHHmmSSS').toString();
            return encodeURIComponent(fname.replace(reg, '$1_' + date + '$2'));
        }
    },

    getFileNameUploaded: function(url) {
        return url.substring(url.length - url.split("").reverse().join("").indexOf("/"), url.length);
    }
};
